export type ChernoVideo = {
  index: number;
  title: string;
  durationSeconds: number;
};

export type ChernoDay = {
  day: number;
  title: string;
  defaultGoal: string;
  videos: ChernoVideo[];
};

export type ChernoPlaylistData = {
  playlistUrl: string;
  totalVideos: number;
  days: ChernoDay[];
};

export type ChernoDayState = {
  goal: string;
  plannedDate: string;
  videos: Record<string, boolean>;
};

export type ChernoState = {
  version: 1;
  days: Record<string, ChernoDayState>;
  lastUpdated: string | null;
};
