import type { ChernoDay, ChernoState } from "@/types/cherno";

export const CHERNO_STORE_KEY = "thecherno-cpp-progress-v1";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function defaultChernoState(): ChernoState {
  return { version: 1, days: {}, lastUpdated: null };
}

export function normalizeChernoState(value: unknown): ChernoState {
  const normalized = defaultChernoState();
  if (!isPlainObject(value)) return normalized;

  if (isPlainObject(value.days)) {
    for (const [dayKey, dayValue] of Object.entries(value.days)) {
      if (!isPlainObject(dayValue)) continue;
      const goal = typeof dayValue.goal === "string" ? dayValue.goal : "";
      const plannedDate = typeof dayValue.plannedDate === "string" ? dayValue.plannedDate : "";
      const videos = isPlainObject(dayValue.videos)
        ? Object.fromEntries(
            Object.entries(dayValue.videos).filter(([, v]) => typeof v === "boolean"),
          )
        : {};
      normalized.days[dayKey] = { goal, plannedDate, videos: videos as Record<string, boolean> };
    }
  }

  normalized.lastUpdated = typeof value.lastUpdated === "string" ? value.lastUpdated : null;
  return normalized;
}

export function loadChernoState(): ChernoState {
  if (typeof window === "undefined") return defaultChernoState();
  try {
    const raw = window.localStorage.getItem(CHERNO_STORE_KEY);
    return raw ? normalizeChernoState(JSON.parse(raw)) : defaultChernoState();
  } catch {
    return defaultChernoState();
  }
}

export function saveChernoState(state: ChernoState): { state: ChernoState; ok: boolean } {
  const updated: ChernoState = { ...state, lastUpdated: new Date().toISOString() };
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CHERNO_STORE_KEY, JSON.stringify(updated));
    }
    return { state: updated, ok: true };
  } catch {
    return { state: updated, ok: false };
  }
}

export function videoKeysForDay(day: ChernoDay): string[] {
  return day.videos.map((video) => String(video.index).padStart(3, "0"));
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function dayTotalSeconds(day: ChernoDay): number {
  return day.videos.reduce((sum, video) => sum + video.durationSeconds, 0);
}

export function dayCompletion(state: ChernoState, day: ChernoDay): { done: number; total: number } {
  const keys = videoKeysForDay(day);
  const videos = state.days[String(day.day)]?.videos || {};
  const done = keys.filter((key) => videos[key]).length;
  return { done, total: keys.length };
}

export function exportChernoState(state: ChernoState, days: ChernoDay[]) {
  const payload = {
    version: state.version,
    days: Object.fromEntries(
      days.map((day) => {
        const key = String(day.day);
        const dayState = state.days[key] || { goal: day.defaultGoal, plannedDate: "", videos: {} };
        const { done, total } = dayCompletion(state, day);
        return [
          key,
          {
            goal: dayState.goal || day.defaultGoal,
            plannedDate: dayState.plannedDate || "",
            completed: done === total,
            videos: dayState.videos,
          },
        ];
      }),
    ),
    lastUpdated: state.lastUpdated,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "thecherno-cpp-progress.json";
  a.click();
  URL.revokeObjectURL(url);
}
