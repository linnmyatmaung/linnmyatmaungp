export type Education = {
  school: string;
  startDate: string;
  endDate: string;
  notes: string;
  degree: string;
  activities: string;
};

export type Position = {
  company: string;
  title: string;
  description: string;
  location: string;
  startedOn: string;
  finishedOn: string;
};

export type Certification = {
  name: string;
  url: string;
  authority: string;
  startedOn: string;
  finishedOn: string;
  licenseNumber: string;
  previewUrl: string | null;
  isDrive: boolean;
};

export function formatDateRange(start: string, end: string): string {
  if (start && end) return `${start} – ${end}`;
  if (start) return `${start} – Present`;
  return end || "";
}
