export interface HomeOpening {
	home: Array<{
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
}

export interface AboutOpening {
	_id: string;
	about: Array<{
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
}

export type HomeOpeningType = HomeOpening[];
export type AboutOpeningType = AboutOpening[];