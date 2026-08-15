"use client";

import { useEffect, useMemo, useRef, useState, type ReactElement, type ReactNode } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import DatasetRoundedIcon from "@mui/icons-material/DatasetRounded";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import type { DashboardState, PlanData } from "@/types/dashboard";
import {
  completionPercent,
  defaultState,
  flattenProblems,
  getWeeklyTask,
  isWeekComplete,
  loadState,
  normalizeState,
  saveState,
  todayContext,
  weekPatternTags,
} from "@/lib/dashboard-state";
import { initAuthPersistence, initFirebaseAnalytics, firebaseAuth, googleProvider } from "@/lib/firebase";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { loadUserProgress, saveUserProgress } from "@/lib/cloud-progress";
import planDataJson from "@/data/plan-data.json";

type SaveStatus = { text: string; isError?: boolean };

const planData = planDataJson as PlanData;

const fontFamily = 'var(--font-inter), "Segoe UI", Roboto, sans-serif';

const sharedComponents = {
  MuiCard: {
    styleOverrides: {
      root: { backgroundImage: "none" },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { textTransform: "none" as const, fontWeight: 600, borderRadius: 10 },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { fontWeight: 600 },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: { borderRadius: 10 },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: { textTransform: "none" as const, fontWeight: 600 },
    },
  },
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#4f8fe8" },
    secondary: { main: "#48b99a" },
    success: { main: "#51c58f" },
    warning: { main: "#e9b44c" },
    error: { main: "#df6674" },
    background: { default: "#101317", paper: "#171c22" },
    text: { primary: "#eef1f4", secondary: "#aab4bf" },
    divider: "#303a45",
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily,
    h4: { fontWeight: 800, letterSpacing: -0.3 },
    h6: { fontWeight: 700, letterSpacing: -0.1 },
    subtitle2: { letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 700, fontSize: "0.72rem" },
  },
  components: sharedComponents,
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3366cc" },
    secondary: { main: "#0b8fac" },
    success: { main: "#2f8f52" },
    warning: { main: "#a06a0c" },
    error: { main: "#c53a34" },
    background: { default: "#f5f7fb", paper: "#ffffff" },
    divider: "rgba(15,23,42,0.08)",
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily,
    h4: { fontWeight: 800, letterSpacing: -0.3 },
    h6: { fontWeight: 700, letterSpacing: -0.1 },
    subtitle2: { letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 700, fontSize: "0.72rem" },
  },
  components: sharedComponents,
});

const tabs = ["Overview", "Timeline", "Patterns", "LeetCode", "Buffer"];

export default function DashboardApp() {
  const [isDark, setIsDark] = useState(true);
  const [state, setState] = useState<DashboardState>(() => loadState());
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({ text: "Saved locally" });
  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState("");
  const [weekFilter, setWeekFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const stateRef = useRef(state);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    initFirebaseAnalytics().catch(() => undefined);
    initAuthPersistence().catch(() => undefined);

    const unsub = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);

      if (!currentUser) {
        setSaveStatus({ text: "Saved locally" });
        return;
      }

      try {
        const cloudState = await loadUserProgress(currentUser.uid);
        if (cloudState) {
          const normalized = normalizeState(cloudState);
          const localSaved = saveState(normalized, setSaveStatus);
          setState(localSaved);
          setSaveStatus({ text: "Cloud data loaded" });
        } else {
          await saveUserProgress(currentUser.uid, stateRef.current);
          setSaveStatus({ text: "Cloud profile created" });
        }
      } catch (error) {
        const detail = error instanceof Error ? error.message : "unknown-error";
        console.error("Cloud load/create failed:", error);
        setSaveStatus({ text: `Cloud sync unavailable: ${detail}`, isError: true });
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authReady || !user) return;
    if (syncTimer.current) clearTimeout(syncTimer.current);

    syncTimer.current = setTimeout(async () => {
      try {
        await saveUserProgress(user.uid, state);
        setSaveStatus((prev) => (prev.isError ? { text: "Saved to cloud" } : prev));
      } catch (error) {
        const detail = error instanceof Error ? error.message : "unknown-error";
        console.error("Cloud save failed:", error);
        setSaveStatus({ text: `Cloud sync unavailable: ${detail}`, isError: true });
      }
    }, 700);

    return () => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
    };
  }, [state, user, authReady]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === "cpp-dsa-master-plan-v2") {
        setState(loadState());
        setSaveStatus({ text: "Updated from another tab" });
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const theme = isDark ? darkTheme : lightTheme;
  const problems = useMemo(() => flattenProblems(planData), []);
  const today = todayContext(planData);

  const completion = completionPercent(state, planData);
  const completedWeeks = planData.weeks.filter((week) => isWeekComplete(state, week)).length;
  const attempted = problems.filter((problem) => (state.lc[problem.id] || "todo") !== "todo").length;
  const green = problems.filter((problem) => (state.lc[problem.id] || "todo") === "green").length;
  const masteredPatterns = planData.patterns.filter((_, idx) => !!state.patterns[idx]).length;

  const updateState = (updater: (prev: DashboardState) => DashboardState) => {
    setState((prev) => {
      const next = updater(prev);
      return saveState(next, setSaveStatus);
    });
  };

  const filteredProblems = problems.filter((problem) => {
    const status = state.lc[problem.id] || "todo";
    const text = `${problem.id} ${problem.title} ${problem.weekGoal}`.toLowerCase();
    const queryMatch = !query || text.includes(query.toLowerCase());
    const weekMatch = weekFilter === "all" || String(problem.weekNumber) === weekFilter;
    const statusMatch = statusFilter === "all" || status === statusFilter;
    return queryMatch && weekMatch && statusMatch;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 8 }}>
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: "blur(14px)", borderBottom: 1, borderColor: "divider" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ minHeight: 72, gap: 2, flexWrap: "wrap" }}>
              <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
                <TrackChangesRoundedIcon color="primary" />
                <Typography variant="h6">C++ DSA Product Tracker</Typography>
              </Stack>

              <Tabs
                value={tab}
                onChange={(_, value) => setTab(value)}
                sx={{ ml: { xs: 0, md: 2 }, flex: 1, minHeight: 44 }}
                variant="scrollable"
                allowScrollButtonsMobile
              >
                {tabs.map((label) => (
                  <Tab key={label} label={label} sx={{ minHeight: 44 }} />
                ))}
              </Tabs>

              <Chip
                size="small"
                color={saveStatus.isError ? "error" : "success"}
                label={saveStatus.text}
                sx={{ fontWeight: 600 }}
              />

              {!authReady && <CircularProgress size={22} />}

              {authReady && !user && (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<GoogleIcon />}
                  onClick={async () => {
                    try {
                      await signInWithPopup(firebaseAuth, googleProvider);
                    } catch (error) {
                      const code = error instanceof Error ? error.message : "unknown-error";
                      console.error("Google sign-in failed:", error);
                      setSaveStatus({ text: `Google login failed: ${code}`, isError: true });
                    }
                  }}
                >
                  Sign in with Google
                </Button>
              )}

              {user && (
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Chip
                    avatar={<Avatar>{(user.displayName || user.email || "U").charAt(0).toUpperCase()}</Avatar>}
                    label={user.email || user.displayName || "Signed in"}
                    variant="outlined"
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<LogoutRoundedIcon />}
                    onClick={async () => {
                      await signOut(firebaseAuth);
                      setState(loadState());
                    }}
                  >
                    Logout
                  </Button>
                </Stack>
              )}

              <Button variant="outlined" size="small" onClick={() => setIsDark((s) => !s)}>
                {isDark ? "Light" : "Dark"}
              </Button>
            </Toolbar>

            <Stack
              direction="row"
              spacing={1}
              sx={{ pb: 1, overflowX: "auto", "&::-webkit-scrollbar": { display: "none" } }}
            >
              <NavStat icon={<CalendarMonthRoundedIcon fontSize="small" />} value={`${completedWeeks}/22`} label="Weeks" />
              <NavStat icon={<DatasetRoundedIcon fontSize="small" />} value={`${attempted}/150`} label="LeetCode" />
              <NavStat icon={<DoneAllRoundedIcon fontSize="small" color="success" />} value={`${green}`} label="Green" />
              <NavStat
                icon={<TrackChangesRoundedIcon fontSize="small" color="secondary" />}
                value={`${masteredPatterns}/${planData.patterns.length}`}
                label="Patterns"
              />
            </Stack>
          </Container>
        </AppBar>

        <Container maxWidth="xl" sx={{ pt: 3 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mb: 2.5, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
          >
            <Typography variant="body2" color="text.secondary">
              Plan window: <strong>{planData.planStart}</strong> to <strong>{planData.bufferEnd}</strong>
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" size="small" onClick={() => setTab(1)}>
                Go To Current Week
              </Button>
              {!user && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "dashboard-progress.json";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Export Progress
                </Button>
              )}
              <Button
                color="error"
                variant="outlined"
                size="small"
                onClick={() => {
                  if (!window.confirm("Reset all progress on this browser?")) return;
                  updateState(() => defaultState());
                }}
              >
                Reset
              </Button>
            </Stack>
          </Stack>

          <Grid container spacing={2.5}>
            <Grid size={12}>
              <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle2" color="secondary.main" gutterBottom>
                    Completion
                  </Typography>
                  <Typography variant="h3" sx={{ mb: 1 }}>
                    {completion}%
                  </Typography>
                  <LinearProgress variant="determinate" value={completion} sx={{ height: 10, borderRadius: 99 }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid size={12}>
              <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
                <CardContent sx={{ py: 2.1 }}>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={1.4} sx={{ alignItems: { xs: "flex-start", md: "center" } }}>
                    <Chip label={today.headline} color="secondary" variant="outlined" />
                    <Chip
                      size="small"
                      label={`Day ${today.dayNumber}/${today.totalDays} • ${today.daysRemaining} left`}
                      variant="outlined"
                    />
                    <Typography>
                      <strong>Today&apos;s goal:</strong> {today.body}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {tab === 0 && (
              <Grid size={12}>
                <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>Command Center</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2.5 }}>
                      {new Date() < new Date(`${planData.planStart}T00:00:00`)
                        ? "Starting point: prepare toolchain and schedule before launch week."
                        : "Focus on consistent weekdays, timed Friday reviews, and pattern-first re-solves."}
                    </Typography>
                    <Grid container spacing={2}>
                      {planData.milestones.map((milestone, idx) => (
                        <Grid key={milestone.date} size={{ xs: 12, md: 6 }}>
                          <Card variant="outlined" sx={{ borderRadius: "12px" }}>
                            <CardContent sx={{ py: 1.6 }}>
                              <Stack direction="row" spacing={0.5} sx={{ alignItems: "flex-start" }}>
                                <Checkbox
                                  checked={!!state.milestones[idx]}
                                  onChange={(event) =>
                                    updateState((prev) => ({
                                      ...prev,
                                      milestones: { ...prev.milestones, [idx]: event.target.checked },
                                    }))
                                  }
                                  sx={{ mt: -0.7 }}
                                />
                                <Box>
                                  <Typography sx={{ fontWeight: 700 }}>{milestone.date}</Typography>
                                  <Typography color="text.secondary">{milestone.text}</Typography>
                                </Box>
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {tab === 1 && (
              <Grid size={12}>
                <Stack spacing={1.5}>
                  {planData.weeks.map((week) => {
                    const task = getWeeklyTask(state, week.number);
                    const done = [task.learncpp, task.dsa, task.patterns, task.implementation, task.checkpoint].filter(Boolean).length;
                    const lcDone = week.problems.filter((problem) => (state.lc[problem.id] || "todo") !== "todo").length;
                    const total = 5 + week.problems.length;
                    const pct = Math.round(((done + lcDone) / total) * 100);

                    return (
                      <Card key={week.number} elevation={0} sx={{ border: 1, borderColor: "divider" }}>
                        <CardContent>
                          <Stack direction={{ xs: "column", md: "row" }} spacing={1.2} sx={{ justifyContent: "space-between" }}>
                            <Box>
                              <Typography variant="subtitle2" color="secondary.main">
                                Week {week.number} · {week.dates}
                              </Typography>
                              <Typography variant="h6">{week.goal}</Typography>
                            </Box>
                            <Chip label={`${pct}% complete`} color={pct > 69 ? "success" : "default"} />
                          </Stack>

                          <LinearProgress variant="determinate" value={pct} sx={{ mt: 1.5, mb: 2 }} />

                          <Grid container spacing={1.2}>
                            {(
                              [
                                ["learncpp", "LearnCpp", week.learncpp],
                                ["dsa", "Design Gurus / DSA", week.dsa],
                                ["patterns", "Interview patterns", week.patterns],
                                ["implementation", "Implementation", week.implementation],
                              ] as const
                            ).map(([key, label, desc]) => (
                              <Grid key={key} size={{ xs: 12, sm: 6 }}>
                                <Card variant="outlined" sx={{ borderRadius: "12px", height: "100%" }}>
                                  <CardContent sx={{ py: 1, pl: 1 }}>
                                    <Stack direction="row" spacing={0.5} sx={{ alignItems: "flex-start" }}>
                                      <Checkbox
                                        checked={task[key as keyof typeof task]}
                                        onChange={(event) =>
                                          updateState((prev) => ({
                                            ...prev,
                                            weekly: {
                                              ...prev.weekly,
                                              [week.number]: {
                                                ...getWeeklyTask(prev, week.number),
                                                [key]: event.target.checked,
                                              },
                                            },
                                          }))
                                        }
                                        sx={{ mt: -0.5 }}
                                      />
                                      <Box>
                                        <Typography sx={{ fontWeight: 700, mb: 0.2 }}>{label}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                          {desc}
                                        </Typography>
                                      </Box>
                                    </Stack>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>

                          {week.problems.length > 0 && (
                            <Box sx={{ mt: 2.5 }}>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                This week&apos;s LeetCode targets
                              </Typography>
                              <Stack direction="row" spacing={0.8} sx={{ flexWrap: "wrap", gap: 0.8 }}>
                                {week.problems.map((problem) => {
                                  const status = state.lc[problem.id] || "todo";
                                  return (
                                    <Chip
                                      key={problem.id}
                                      size="small"
                                      label={`#${problem.id} ${problem.title}`}
                                      color={
                                        status === "green"
                                          ? "success"
                                          : status === "red"
                                            ? "error"
                                            : status === "yellow"
                                              ? "warning"
                                              : "default"
                                      }
                                      variant={status === "todo" ? "outlined" : "filled"}
                                      onClick={() => {
                                        setTab(3);
                                        setWeekFilter(String(week.number));
                                      }}
                                    />
                                  );
                                })}
                              </Stack>
                            </Box>
                          )}

                          <Box sx={{ mt: 2 }}>
                            <Card variant="outlined" sx={{ borderRadius: "12px" }}>
                              <CardContent sx={{ py: 1, pl: 1 }}>
                                <Stack direction="row" spacing={0.5} sx={{ alignItems: "flex-start" }}>
                                  <Checkbox
                                    checked={task.checkpoint}
                                    onChange={(event) =>
                                      updateState((prev) => ({
                                        ...prev,
                                        weekly: {
                                          ...prev.weekly,
                                          [week.number]: {
                                            ...getWeeklyTask(prev, week.number),
                                            checkpoint: event.target.checked,
                                          },
                                        },
                                      }))
                                    }
                                    sx={{ mt: -0.5 }}
                                  />
                                  <Box>
                                    <Typography sx={{ fontWeight: 700, mb: 0.2 }}>Friday checkpoint</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {week.checkpoint}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </CardContent>
                            </Card>
                          </Box>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Stack>
              </Grid>
            )}

            {tab === 2 && (
              <Grid size={12}>
                <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Pattern Mastery Matrix</Typography>
                    <Grid container spacing={1.2}>
                      {planData.patterns.map((pattern, idx) => (
                        <Grid key={pattern} size={{ xs: 12, sm: 6, md: 4 }}>
                          <Card variant="outlined" sx={{ borderRadius: "12px", height: "100%" }}>
                            <CardContent sx={{ py: 0.6, pl: 1 }}>
                              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                                <Checkbox
                                  checked={!!state.patterns[idx]}
                                  onChange={(event) =>
                                    updateState((prev) => ({
                                      ...prev,
                                      patterns: { ...prev.patterns, [idx]: event.target.checked },
                                    }))
                                  }
                                />
                                <Typography>{pattern}</Typography>
                              </Stack>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {tab === 3 && (
              <Grid size={12}>
                <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>LeetCode 150 Tracker</Typography>
                    <Grid container spacing={1.2} sx={{ mb: 2 }}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Search problems"
                          value={query}
                          onChange={(event) => setQuery(event.target.value)}
                          placeholder="e.g. sliding window, two sum"
                          slotProps={{
                            input: {
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SearchRoundedIcon fontSize="small" color="disabled" />
                                </InputAdornment>
                              ),
                            },
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Week</InputLabel>
                          <Select value={weekFilter} label="Week" onChange={(event) => setWeekFilter(String(event.target.value))}>
                            <MenuItem value="all">All</MenuItem>
                            {planData.weeks.map((week) => (
                              <MenuItem key={week.number} value={String(week.number)}>
                                Week {week.number}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid size={{ xs: 6, md: 3 }}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Status</InputLabel>
                          <Select value={statusFilter} label="Status" onChange={(event) => setStatusFilter(String(event.target.value))}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="todo">To do</MenuItem>
                            <MenuItem value="green">GREEN</MenuItem>
                            <MenuItem value="yellow">YELLOW</MenuItem>
                            <MenuItem value="red">RED</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Stack spacing={1}>
                      {filteredProblems.map((problem) => {
                        const status = state.lc[problem.id] || "todo";
                        const tags = weekPatternTags(problem.weekPatterns);
                        const link = state.links[problem.id] || "";
                        return (
                          <Card key={problem.id} variant="outlined" sx={{ borderRadius: "12px" }}>
                            <CardContent sx={{ py: 1.2 }}>
                              <Stack
                                direction={{ xs: "column", md: "row" }}
                                spacing={1.2}
                                sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}
                              >
                                <Box>
                                  <Typography sx={{ fontWeight: 700 }}>#{problem.id} {problem.title}</Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mb: tags.length ? 0.6 : 0 }}>
                                    Week {problem.weekNumber} · {problem.weekGoal}
                                  </Typography>
                                  {tags.length > 0 && (
                                    <Stack direction="row" spacing={0.6} sx={{ flexWrap: "wrap", gap: 0.6 }}>
                                      {tags.map((tag) => (
                                        <Chip key={tag} size="small" label={tag} variant="outlined" sx={{ height: 22, fontSize: "0.7rem" }} />
                                      ))}
                                    </Stack>
                                  )}
                                </Box>
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ alignItems: { xs: "stretch", sm: "center" } }}>
                                  <TextField
                                    size="small"
                                    placeholder="Linear task link"
                                    value={link}
                                    onChange={(event) =>
                                      updateState((prev) => ({
                                        ...prev,
                                        links: { ...prev.links, [problem.id]: event.target.value },
                                      }))
                                    }
                                    slotProps={{
                                      input: {
                                        endAdornment: link ? (
                                          <InputAdornment position="end">
                                            <IconButton
                                              size="small"
                                              component="a"
                                              href={link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <LinkRoundedIcon fontSize="small" />
                                            </IconButton>
                                          </InputAdornment>
                                        ) : undefined,
                                      },
                                    }}
                                    sx={{ minWidth: { xs: "100%", sm: 200 } }}
                                  />
                                  <FormControl size="small" sx={{ minWidth: 150 }}>
                                    <Select
                                      value={status}
                                      color={
                                        status === "green"
                                          ? "success"
                                          : status === "red"
                                            ? "error"
                                            : status === "yellow"
                                              ? "warning"
                                              : undefined
                                      }
                                      onChange={(event) =>
                                        updateState((prev) => ({
                                          ...prev,
                                          lc: {
                                            ...prev.lc,
                                            [problem.id]: event.target.value as "todo" | "green" | "yellow" | "red",
                                          },
                                        }))
                                      }
                                    >
                                      <MenuItem value="todo">To do</MenuItem>
                                      <MenuItem value="green">GREEN</MenuItem>
                                      <MenuItem value="yellow">YELLOW</MenuItem>
                                      <MenuItem value="red">RED</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Stack>
                              </Stack>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {tab === 4 && (
              <Grid size={12}>
                <Card elevation={0} sx={{ border: 1, borderColor: "divider" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Month 6 Buffer</Typography>
                    <Stack spacing={1.3}>
                      {planData.bufferWeeks.map((week, idx) => (
                        <Card key={week.title} variant="outlined" sx={{ borderRadius: "12px" }}>
                          <CardContent>
                            <Typography variant="subtitle2" color="secondary.main">{week.dates}</Typography>
                            <Typography variant="h6" sx={{ mb: 1 }}>{week.title}</Typography>
                            <Stack spacing={0.9}>
                              {week.tasks.map((task, taskIdx) => {
                                const key = `${idx}-${taskIdx}`;
                                return (
                                  <Stack key={key} direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                                    <Checkbox
                                      checked={!!state.buffer[key]}
                                      onChange={(event) =>
                                        updateState((prev) => ({
                                          ...prev,
                                          buffer: { ...prev.buffer, [key]: event.target.checked },
                                        }))
                                      }
                                    />
                                    <Typography>{task}</Typography>
                                  </Stack>
                                );
                              })}
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

function NavStat({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <Chip
      size="small"
      variant="outlined"
      icon={icon as ReactElement}
      label={
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "baseline" }}>
          <Typography component="span" variant="caption" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
          <Typography component="span" variant="caption" color="text.secondary">
            {label}
          </Typography>
        </Stack>
      }
      sx={{ height: 28, "& .MuiChip-label": { px: 1 } }}
    />
  );
}
