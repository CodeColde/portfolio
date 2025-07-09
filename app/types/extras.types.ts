export interface ExtraEntryType {
  certification: string;
  company: string;
  location?: string;
  year: string;
  details: string;
}

export type ExtraType = ExtraEntryType[];