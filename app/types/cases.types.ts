export interface CaseEntry {
  _id: string;
  client: string;
  coverImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  coverImageMobile: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  excerpt: string;
  liveLink: string;
  purpose: string;
  responsibilities: Array<{
		_key: string;
		_type: string;
		children: Array<{
			_key: string;
			_type: string;
			text: string;
		}>;
		markDefs: [];
		style: string;
	}>;
  slug: {
    _type: string;
    current: string;
  };
  title: string;
  year: number;
}

export interface CaseIntroEntry {
  _id: string;
  client: string;
  coverImage: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  slug: {
    _type: string;
    current: string;
  };
  title: string;
}

export type CasesResponse = CaseEntry[];
export type CaseSummaryResponse = CaseIntroEntry[];