import type { DashboardState, WeekTaskStatus, PlanData } from "@/types/dashboard";

export const STORE_KEY = "cpp-dsa-master-plan-v2";

type SaveStatus = { text: string; isError?: boolean };

export function defaultState(): DashboardState {
  return {
    weekly: {},
    lc: {},
    patterns: {},
    cpp: {},
    implementations: {},
    completion: {},
    readiness: {},
    milestones: {},
    buffer: {},
    links: {},
    updatedAt: null,
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function normalizeState(value: unknown): DashboardState {
  const normalized = defaultState();
  if (!isPlainObject(value)) return normalized;

  if (isPlainObject(value.weekly)) normalized.weekly = value.weekly as DashboardState["weekly"];
  if (isPlainObject(value.lc)) normalized.lc = value.lc as DashboardState["lc"];
  if (isPlainObject(value.patterns)) normalized.patterns = value.patterns as DashboardState["patterns"];
  if (isPlainObject(value.cpp)) normalized.cpp = value.cpp as DashboardState["cpp"];
  if (isPlainObject(value.implementations)) {
    normalized.implementations = value.implementations as DashboardState["implementations"];
  }
  if (isPlainObject(value.completion)) normalized.completion = value.completion as DashboardState["completion"];
  if (isPlainObject(value.readiness)) normalized.readiness = value.readiness as DashboardState["readiness"];
  if (isPlainObject(value.milestones)) normalized.milestones = value.milestones as DashboardState["milestones"];
  if (isPlainObject(value.buffer)) normalized.buffer = value.buffer as DashboardState["buffer"];
  if (isPlainObject(value.links)) normalized.links = value.links as DashboardState["links"];

  normalized.updatedAt = typeof value.updatedAt === "string" ? value.updatedAt : null;
  return normalized;
}

export function loadState(): DashboardState {
  if (typeof window === "undefined") return defaultState();

  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : defaultState();
  } catch {
    return defaultState();
  }
}

export function saveState(
  state: DashboardState,
  setStatus: (status: SaveStatus) => void,
): DashboardState {
  const updatedState: DashboardState = {
    ...state,
    updatedAt: new Date().toISOString(),
  };

  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(updatedState));
    }

    const time = new Date(updatedState.updatedAt || Date.now()).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    setStatus({ text: `Saved ${time}` });
  } catch {
    setStatus({ text: "Local save unavailable", isError: true });
  }

  return updatedState;
}

export function getWeeklyTask(state: DashboardState, weekNumber: number): WeekTaskStatus {
  return (
    state.weekly[weekNumber] || {
      learncpp: false,
      dsa: false,
      patterns: false,
      implementation: false,
      checkpoint: false,
    }
  );
}

export function isWeekComplete(state: DashboardState, week: PlanData["weeks"][number]) {
  const task = getWeeklyTask(state, week.number);
  const curriculumDone =
    task.learncpp && task.dsa && task.patterns && task.implementation && task.checkpoint;
  const lcDone = week.problems.every((problem) => (state.lc[problem.id] || "todo") !== "todo");
  return curriculumDone && lcDone;
}

export function flattenProblems(data: PlanData) {
  return data.weeks.flatMap((week) =>
    week.problems.map((problem) => ({
      ...problem,
      weekNumber: week.number,
      weekGoal: week.goal,
      weekDates: week.dates,
      weekPatterns: week.patterns,
    })),
  );
}

const GENERIC_TAG_WORDS = new Set(["none", "reinforcement", "basics", "exposure"]);

export function weekPatternTags(patternsText: string): string[] {
  return patternsText
    .replace(/\.$/, "")
    .split(/[;,]/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && !GENERIC_TAG_WORDS.has(part.toLowerCase()));
}

export function completionPercent(state: DashboardState, data: PlanData) {
  const problems = flattenProblems(data);
  const attempted = problems.filter((p) => (state.lc[p.id] || "todo") !== "todo").length;
  const patterns = data.patterns.filter((_, idx) => !!state.patterns[idx]).length;

  let curriculumDone = 0;
  data.weeks.forEach((week) => {
    const task = getWeeklyTask(state, week.number);
    curriculumDone += [task.learncpp, task.dsa, task.patterns, task.implementation, task.checkpoint].filter(
      Boolean,
    ).length;
  });

  const total = data.weeks.length * 5 + problems.length + data.patterns.length;
  return Math.round(((curriculumDone + attempted + patterns) / total) * 100);
}

export function todayContext(data: PlanData) {
  const today = new Date();
  const weekday = today.getDay();

  const dateOnly = (iso: string) => new Date(`${iso}T12:00:00`);
  const localDay = (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000;

  const start = dateOnly(data.planStart);
  const primaryEnd = dateOnly(data.primaryEnd);
  const bufferEnd = dateOnly(data.bufferEnd);

  const todayDay = localDay(today);
  const startDay = localDay(start);
  const primaryEndDay = localDay(primaryEnd);
  const bufferEndDay = localDay(bufferEnd);

  const totalDays = bufferEndDay - startDay + 1;
  const dayNumber = Math.min(totalDays, Math.max(1, todayDay - startDay + 1));
  const daysRemaining = Math.max(0, totalDays - dayNumber);

  if (todayDay < startDay) {
    return {
      headline: new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(today),
      body: "Preparation day: set up toolchain, reserve weekday study blocks, and keep syllabus work for launch week.",
      totalDays,
      dayNumber: 0,
      daysRemaining: totalDays,
    };
  }

  if (todayDay <= primaryEndDay) {
    const weekIdx = Math.max(0, Math.min(21, Math.floor((todayDay - startDay) / 7)));
    const week = data.weeks[weekIdx];

    let focus = `Week ${week.number}: ${week.goal}.`;
    if (weekday === 0) focus = "Sunday is off. Recover and reset for Monday.";
    if (weekday === 6)
      focus = `Saturday is catch-up only. Close pending items from Week ${week.number} or keep it as a rest day.`;
    if (weekday === 5)
      focus = `Friday checkpoint for Week ${week.number}: run two timed sets, explain solutions, and update mistake log.`;

    return {
      headline: new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(today),
      body: focus,
      totalDays,
      dayNumber,
      daysRemaining,
    };
  }

  if (todayDay <= bufferEndDay) {
    return {
      headline: new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(today),
      body: "Buffer month focus: repair weak patterns, re-solve RED/YELLOW items, and run interview-style mocks.",
      totalDays,
      dayNumber,
      daysRemaining,
    };
  }

  return {
    headline: new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(today),
    body: "Maintenance mode: keep mixed practice active and rotate through weak patterns weekly.",
    totalDays,
    dayNumber: totalDays,
    daysRemaining: 0,
  };
}
