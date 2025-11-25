export interface Word {
  _id: string;
  en: string;
  ua: string;
  category: string;
  isIrregular: boolean;
  owner?: string;
  progress?: number;
}

export interface WordsResponse {
  results: Word[];
  totalPages: number;
  page: number;
  perPage: number;
  totalCount: number;
}
