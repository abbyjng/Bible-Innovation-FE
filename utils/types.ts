export const Page = {
  HOME: Symbol("Home"),
  NOTES: Symbol("Notes"),
  FEED: Symbol("Feed"),
  PROFILE: Symbol("Profile"),
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
