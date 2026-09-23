export interface ExperienceEntryType {
  company: string;
  companyUrl?: string | null;
  details: string;
  role: string;
  startDate: string;
  endDate: string;
}

export type ExperienceType = ExperienceEntryType[];
