export interface CoverAsset {
  coverImage: {
    _key: string;
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  altText: string;
  lqip: string;
}

export type CoverAssetType = CoverAsset[];
