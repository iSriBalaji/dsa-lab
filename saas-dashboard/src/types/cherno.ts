export type ChernoDay = {
  day: number;
  title: string;
  defaultGoal: string;
  range: [number, number];
};

export type ChernoPlaylistData = {
  playlistUrl: string;
  totalVideos: number;
  days: ChernoDay[];
};

export type ChernoDayState = {
  goal: string;
  videos: Record<string, boolean>;
};

export type ChernoState = {
  version: 1;
  days: Record<string, ChernoDayState>;
  lastUpdated: string | null;
};
