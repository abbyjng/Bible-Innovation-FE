export const Page = {
  HOME: Symbol("Home"),
  NOTES: Symbol("Notes"),
  FEED: Symbol("Feed"),
  PROFILE: Symbol("Profile"),
  GROWING_ROOTS: Symbol("GrowingRoots"),
};

export interface ChapterType {
  bookname: string;
  chapter: number;
  verses: VerseType[];
}

export interface VerseType {
  [key: string]: string;
}

export interface NoteDataType {
  book: string;
  chapter: number;
  verse: number;
  note: string;
}

export interface SearchPageType {
  page: number;
  pageCount: number;
  content: SearchType[];
}

export interface SearchType {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface VersionInfoType {
  OT: TestamentType[];
  NT: TestamentType[];
}

interface TestamentType {
  [book: string]: number;
}
