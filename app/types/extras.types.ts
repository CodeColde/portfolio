export interface ExtraEntryType {
  certification: string;
  company: string;
  companyUrl?: string | null;
  location?: string;
  year: string;
  details: string;
}

export type ExtraType = ExtraEntryType[];
