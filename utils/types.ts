export const Page = {
  HOME: Symbol("Home"),
  NOTES: Symbol("Notes"),
  FEED: Symbol("Feed"),
  PROFILE: Symbol("Profile"),
};

export interface ChapterType {
  book: string;
  chapter: number;
  title: string;
  sections: { title: string; verses: VerseType[] }[];
}

export interface VerseType {
  number: number;
  text: string;
}
