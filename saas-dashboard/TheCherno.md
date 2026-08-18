# Requirements: C++ Playlist Progress Tracker Page

## 1. Overview

A single web page (static site page) that displays a 6-day study plan
covering videos 001–054 of a C++ YouTube playlist. The user can check
off individual videos and days as completed, and set a short personal
goal/note per day. All progress must persist locally in the browser
between visits — no backend, no login, no external database.

**Source playlist:**
https://youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb

## 2. Goals

- Give a single reference page for the 6-day plan that's usable
  entirely offline after first load.
- Let the user mark progress at two levels: per-video and per-day.
- Let the user write/edit a short free-text goal for each day.
- Guarantee progress is not lost on refresh, browser restart, or
  accidental tab close.
- Zero setup for the user beyond opening the HTML file — no server,
  no account, no external dependency required at runtime.

## 3. Content Requirements

For each of the 6 days, the page must display:

- Day title / theme (e.g. "Day 1 — Setup & Core Basics")
- Day goal statement (pre-filled default, editable by user)
- Total runtime for that day's videos
- A list of that day's videos, each with:
  - Playlist index number (e.g. `001`)
  - Video title
  - Duration (mm:ss)
  - A clickable link to the video

At the top of the page:

- Link to the source playlist (see §1)
- Overall stats: total videos (54), total runtime, date range /
  intended pace (6 days)

### Video links

Individual video IDs were not available for every entry (only a
subset were captured from prior download logs). Until each exact
video ID is filled in, video links should use the playlist +
index deep link pattern, which opens the playlist and jumps to the
correct position:

```
https://www.youtube.com/watch?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb&index=N
```

Where `N` is the video's position in the playlist (1-based). This
should be replaced with a direct `watch?v=VIDEO_ID` link per video
once IDs are collected (e.g. via `yt-dlp --flat-playlist --print
"%(playlist_index)s %(id)s %(title)s" PLAYLIST_URL`, which lists
every video ID in one pass).

## 4. Data Model

Suggested shape for locally stored progress data (JSON):

```json
{
  "version": 1,
  "days": {
    "1": {
      "goal": "Environment ready, first program compiled...",
      "completed": false,
      "videos": {
        "001": true,
        "002": true,
        "003": false
      }
    }
  },
  "lastUpdated": "2026-08-18T00:00:00Z"
}
```

- `version` allows future migrations if the data shape changes.
- Video keys use the zero-padded playlist index (`"001"`, not `"1"`)
  to match the source report exactly.
- `completed` on a day can be auto-derived (all videos checked) or
  manually toggled — pick one behavior and be consistent; auto-derive
  is recommended so there's no way for the two to disagree.

## 5. Functional Requirements

| ID | Requirement |
|----|-------------|
| F1 | User can check/uncheck each individual video as watched. |
| F2 | A day's overall progress (e.g. "6/9 videos") updates automatically as videos are checked. |
| F3 | A day is visually marked complete only when all its videos are checked. |
| F4 | User can type/edit a free-text goal note per day, saved independently of checkbox state. |
| F5 | All state (checkboxes + goal text) persists automatically — no explicit "Save" button required; save on every change. |
| F6 | On page reload, all previously saved state is restored exactly as left. |
| F7 | A visible "reset progress" action exists, but requires confirmation before clearing data. |
| F8 | Page works fully offline after the first load (no network calls required for core function). |

## 6. Non-Functional Requirements

- **Reliability of local storage:** use `localStorage` (simple,
  synchronous, sufficient for this data size) as the primary store.
  Because `localStorage` can be cleared by browser cleanup tools or
  private/incognito sessions, also provide a manual **Export /
  Import JSON** function so the user can back up progress to a file
  and restore it on another device or after a browser data wipe.
- **No data loss on partial input:** writes to storage should happen
  on every checkbox toggle and on goal-text blur (not only on page
  unload, which can be unreliable).
- **Performance:** page must remain responsive with all 54 rows
  rendered and interactive; no pagination needed at this scale.
- **Portability:** page should work as a single self-contained HTML
  file (or HTML + one JS + one CSS file) that can be opened directly
  from disk (`file://`) or hosted on any static site host, without a
  build step.
- **Accessibility:** checkboxes and text inputs must be keyboard
  operable and properly labeled for screen readers.

## 7. Out of Scope

- Multi-user accounts, sync across devices, or any backend/database.
- Video playback embedded in the page (links open YouTube directly).
- Automatic tracking of actual watch time or YouTube watch history.
- Coverage of videos 055–115 (a future page/phase, not this one).

## 8. Open Items to Resolve Before Build

- [ ] Collect exact video IDs for videos 001–054 (currently only
      partial IDs are known) so links can point directly to each
      video instead of the playlist+index fallback.
- [ ] Decide hosting target (static file opened locally vs. deployed
      to a static host like GitHub Pages/Netlify) — affects whether
      `file://` storage quirks need extra testing.
- [ ] Confirm whether "day complete" should be manually toggleable
      independent of video checkboxes, or strictly auto-derived (F3
      recommends auto-derived for consistency).