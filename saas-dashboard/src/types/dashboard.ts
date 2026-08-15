export type WeekTaskStatus = {
  learncpp: boolean;
  dsa: boolean;
  patterns: boolean;
  implementation: boolean;
  checkpoint: boolean;
};

export type DashboardState = {
  weekly: Record<number, WeekTaskStatus>;
  lc: Record<number, "todo" | "green" | "yellow" | "red">;
  patterns: Record<number, boolean>;
  cpp: Record<number, boolean>;
  implementations: Record<number, boolean>;
  completion: Record<number, boolean>;
  readiness: Record<number, boolean>;
  milestones: Record<number, boolean>;
  buffer: Record<string, boolean>;
  links: Record<number, string>;
  weekPlans: Record<number, string>;
  updatedAt: string | null;
};

export type Problem = {
  id: number;
  title: string;
};

export type Week = {
  number: number;
  dates: string;
  start: string;
  end: string;
  goal: string;
  learncpp: string;
  dsa: string;
  patterns: string;
  implementation: string;
  lc_target: number;
  problems: Problem[];
  checkpoint: string;
};

export type Milestone = {
  date: string;
  text: string;
};

export type BufferWeek = {
  title: string;
  dates: string;
  tasks: string[];
};

export type PlanData = {
  weeks: Week[];
  completion: string[];
  implementations: string[];
  patterns: string[];
  cppSkills: string[];
  readyItems: string[];
  milestones: Milestone[];
  bufferWeeks: BufferWeek[];
  planStart: string;
  primaryEnd: string;
  bufferEnd: string;
};
