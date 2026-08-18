"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  CssBaseline,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import type { ChernoPlaylistData, ChernoState } from "@/types/cherno";
import {
  dayCompletion,
  defaultChernoState,
  exportChernoState,
  loadChernoState,
  normalizeChernoState,
  saveChernoState,
  videoKeysForDay,
} from "@/lib/cherno-state";
import playlistJson from "@/data/cherno-playlist.json";

const playlist = playlistJson as ChernoPlaylistData;

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#4f8fe8" },
    secondary: { main: "#48b99a" },
    success: { main: "#51c58f" },
    background: { default: "#101317", paper: "#171c22" },
    text: { primary: "#eef1f4", secondary: "#aab4bf" },
    divider: "#303a45",
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'var(--font-inter), "Segoe UI", Roboto, sans-serif',
    h6: { fontWeight: 700 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600 } } },
  },
});

export default function ChernoPage() {
  const [state, setState] = useState<ChernoState>(() => loadChernoState());
  const [status, setStatus] = useState("Saved locally");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === "thecherno-cpp-progress-v1") {
        setState(loadChernoState());
        setStatus("Updated from another tab");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = (updater: (prev: ChernoState) => ChernoState) => {
    setState((prev) => {
      const next = updater(prev);
      const { state: saved, ok } = saveChernoState(next);
      setStatus(ok ? "Saved" : "Local save unavailable");
      return saved;
    });
  };

  const toggleVideo = (dayNum: number, videoKey: string, checked: boolean) => {
    persist((prev) => {
      const key = String(dayNum);
      const dayState = prev.days[key] || { goal: "", videos: {} };
      return {
        ...prev,
        days: {
          ...prev.days,
          [key]: { ...dayState, videos: { ...dayState.videos, [videoKey]: checked } },
        },
      };
    });
  };

  const setGoal = (dayNum: number, goal: string) => {
    persist((prev) => {
      const key = String(dayNum);
      const dayState = prev.days[key] || { goal: "", videos: {} };
      return { ...prev, days: { ...prev.days, [key]: { ...dayState, goal } } };
    });
  };

  const totalDone = playlist.days.reduce((sum, day) => sum + dayCompletion(state, day).done, 0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: 8 }}>
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: "blur(14px)", borderBottom: 1, borderColor: "divider" }}>
          <Container maxWidth={false} sx={{ width: { xs: "100%", md: "80%" }, mx: "auto", px: { xs: 2, md: 0 } }}>
            <Toolbar disableGutters sx={{ minHeight: 60, gap: 1.5 }}>
              <Button component={Link} href="/" startIcon={<ArrowBackRoundedIcon />} size="small">
                Dashboard
              </Button>
              <Typography variant="h6" noWrap sx={{ flex: 1 }}>
                TheCherno — C++ Playlist Tracker
              </Typography>
              <Chip size="small" label={status} color={status.includes("unavailable") ? "error" : "success"} />
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth={false} sx={{ width: { xs: "100%", md: "80%" }, mx: "auto", px: { xs: 2, md: 0 }, pt: 3 }}>
          <Card elevation={0} sx={{ border: 1, borderColor: "divider", mb: 2.5 }}>
            <CardContent>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                    6-Day C++ Playlist Plan
                  </Typography>
                  <Typography color="text.secondary">
                    {totalDone}/{playlist.totalVideos} videos watched ·{" "}
                    <a href={playlist.playlistUrl} target="_blank" rel="noopener noreferrer">
                      Open source playlist ↗
                    </a>
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FileDownloadRoundedIcon />}
                    onClick={() => exportChernoState(state, playlist.days)}
                  >
                    Export
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<FileUploadRoundedIcon />}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Import
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    hidden
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      event.target.value = "";
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => {
                        try {
                          const parsed = JSON.parse(String(reader.result));
                          const imported = normalizeChernoState(parsed);
                          const { state: saved, ok } = saveChernoState(imported);
                          setState(saved);
                          setStatus(ok ? "Progress imported" : "Local save unavailable");
                        } catch {
                          setStatus("Import failed: invalid JSON");
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      if (!window.confirm("Reset all TheCherno progress on this browser?")) return;
                      const { state: saved, ok } = saveChernoState(defaultChernoState());
                      setState(saved);
                      setStatus(ok ? "Progress reset" : "Local save unavailable");
                    }}
                  >
                    Reset
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Stack spacing={1}>
            {playlist.days.map((day) => {
              const keys = videoKeysForDay(day);
              const { done, total } = dayCompletion(state, day);
              const goal = state.days[String(day.day)]?.goal ?? day.defaultGoal;
              const isComplete = done === total;

              return (
                <Accordion
                  key={day.day}
                  elevation={0}
                  disableGutters
                  defaultExpanded={day.day === 1}
                  sx={{ border: 1, borderColor: "divider", borderRadius: "12px !important", "&::before": { display: "none" } }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ flex: 1, justifyContent: "space-between", pr: 1 }}>
                      <Typography sx={{ fontWeight: 700 }}>{day.title}</Typography>
                      <Chip size="small" label={`${done}/${total} watched`} color={isComplete ? "success" : "default"} />
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      size="small"
                      label="Day goal"
                      value={goal}
                      onChange={(event) => setGoal(day.day, event.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Stack spacing={0.5}>
                      {keys.map((key, idx) => {
                        const videoIndex = day.range[0] + idx;
                        const checked = !!state.days[String(day.day)]?.videos[key];
                        return (
                          <Stack
                            key={key}
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center", border: 1, borderColor: "divider", borderRadius: "10px", px: 1 }}
                          >
                            <Checkbox
                              checked={checked}
                              onChange={(event) => toggleVideo(day.day, key, event.target.checked)}
                              slotProps={{ input: { "aria-label": `Video ${key} watched` } }}
                            />
                            <Typography sx={{ fontWeight: 700, minWidth: 40 }}>{key}</Typography>
                            <Typography sx={{ flex: 1, color: checked ? "text.secondary" : "text.primary" }}>
                              Episode {key}
                            </Typography>
                            <Button
                              size="small"
                              endIcon={<OpenInNewRoundedIcon fontSize="small" />}
                              component="a"
                              href={`https://www.youtube.com/watch?list=${playlist.playlistUrl.split("list=")[1]}&index=${videoIndex}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Watch
                            </Button>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
            Video titles/durations are placeholders until exact IDs are collected (see TheCherno.md). Links use the
            playlist + index pattern and will jump to the correct video.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
