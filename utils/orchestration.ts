import {
  ChapterType,
  NoteDataType,
  OtherUserType,
  PostType,
  SearchPageType,
  UserType,
  VersionInfoType,
} from "./types";

export const getText = async (
  book: string,
  chapter: number,
  version: string
): Promise<ChapterType | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bible/?book=${book}&chapter=${chapter}&version=${version}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const search = async (
  version: string,
  query: string,
  pageSize?: number,
  page?: number
): Promise<SearchPageType | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/search/?version=${version}&query=${query}` +
        (page ? `&page=${page}` : "") +
        (pageSize ? `&pageSize=${pageSize}` : ""),
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getVersionInfo = async (
  version: string
): Promise<VersionInfoType | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/version-info/?version=${version}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getVersions = async (): Promise<string[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/versions`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result.versions;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getNote = async (
  token: string,
  book: string,
  chapter: number,
  verse: number
): Promise<NoteDataType | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notes/?book=${book}&chapter=${chapter}&verse=${verse}`,
      {
        method: "GET",
        headers: {
          user: token,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getNotes = async (
  token: string
): Promise<NoteDataType[] | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
      method: "GET",
      headers: {
        user: token,
      },
    });
    const result = await response.json();
    const returnNotes = [];
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        returnNotes.push(result[key]);
      }
    }

    return returnNotes;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getPublicNotes = async (
  token: string
): Promise<NoteDataType[] | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
      method: "GET",
      headers: {
        user: token,
      },
    });
    const result = await response.json();
    const returnNotes = [];
    for (const key in result) {
      if (result.hasOwnProperty(key) && result[key].shared) {
        returnNotes.push(result[key]);
      }
    }

    return returnNotes;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getFeed = async (
  token: string
): Promise<
  { page: number; pageCount: number; content: PostType[] } | undefined
> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feed`, {
      method: "GET",
      headers: {
        user: token,
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const createOrUpdateNote = async (
  token: string,
  noteData: NoteDataType
): Promise<string | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
      method: "POST",
      headers: {
        user: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getFriends = async (
  token: string
): Promise<{ item: OtherUserType; refIndex: number }[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/friends/?user=${token}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const searchFriends = async (
  query: string
): Promise<{ item: OtherUserType; refIndex: number }[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search-users/?query=${query}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getUser = async (uid: string): Promise<UserType | undefined> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "GET",
      headers: {
        user: uid,
      },
    });
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};
