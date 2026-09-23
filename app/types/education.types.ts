export interface EducationEntryType {
  degree: string;
  school: string;
  schoolUrl?: string | null;
  details: string;
  startDate: string;
  endDate?: string | null;
}

export type EducationType = EducationEntryType[];
