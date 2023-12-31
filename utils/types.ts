export const Page = {
  HOME: Symbol("Home"),
  NOTES: Symbol("Notes"),
  FEED: Symbol("Feed"),
  PROFILE: Symbol("Profile"),
  GROWING_ROOTS: Symbol("GrowingRoots"),
};

export interface UserContextType {
  isAuthenticated: boolean;
  loading: boolean;
  token?: string;
  user?: UserType;
  streak?: StreakType;
  roots?: StreakType;
  signUp: (displayName: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateStreak: (count: number, lastIncrement: number) => void;
  updateRoots: (count: number, lastIncrement: number) => void;
  updateUser: (displayName: string, photoURL: string) => void;
  followUser: (toFollow: string) => void;
  unfollowUser: (toUnfollow: string) => void;
}

export interface UserType {
  displayName: string;
  uid: string;
  photoURL: string;
  friends?: string[];
}

export interface StreakType {
  count: number;
  lastIncrement: number;
}

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
  timestamp: number;
  shared: boolean;
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

export interface PostType {
  uid: string;
  book: string;
  chapter: number;
  verse: number;
  note: string;
  timestamp: string;
  displayName: string;
  photoURL: string;
}

export interface OtherUserType {
  displayName: string;
  uid: string;
  photoURL: string;
  email: string;
}
