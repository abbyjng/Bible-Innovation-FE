import {
  ChapterType,
  NoteDataType,
  SearchPageType,
  StreakType,
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

export const getNotes = async (
  token: string
): Promise<NoteDataType[] | undefined> => {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/notes/?user=${token}`,
    //   {
    //     method: "GET",
    //   }
    // );
    // const result = await response.json();
    // return result;

    const notes = [
      {
        book: "Genesis",
        chapter: 1,
        verse: 5,
        note: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
        created: 1690203083897,
      },
      {
        book: "Genesis",
        chapter: 1,
        verse: 3,
        note: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
        created: 1690101083897,
      },
      {
        book: "Genesis",
        chapter: 1,
        verse: 10,
        note: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
        created: 1690302083897,
      },
    ];
    const note = localStorage.getItem("noteSaveData");
    if (note) {
      notes.push(JSON.parse(note));
    }
    return notes;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getChapterNotes = async (
  token: string,
  book: string,
  chapter: number
): Promise<NoteDataType[] | undefined> => {
  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/notes/?user=${token}&book=${book}&chapter=${chapter}`,
    //   {
    //     method: "GET",
    //   }
    // );
    // const result = await response.json();
    // return result;

    const notes = [
      {
        book: "Genesis",
        chapter: 1,
        verse: 5,
        note: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
        created: 1690203083897,
      },
      {
        book: "Genesis",
        chapter: 1,
        verse: 3,
        note: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
        created: 1690101083897,
      },
      {
        book: "Genesis",
        chapter: 1,
        verse: 10,
        note: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
        created: 1690302083897,
      },
    ];
    const note = localStorage.getItem("noteSaveData");
    if (note) {
      notes.push(JSON.parse(note));
    }
    return notes;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const createNote = async (
  token: string,
  noteData: NoteDataType
): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notes/create`,
      {
        method: "POST",
        headers: {
          user: token,
          noteData: JSON.stringify(noteData),
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getFollowedNotes = async (
  token: string
): Promise<NoteDataType[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notes/followed/?user=${token}`,
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

export const updateNote = async (
  token: string,
  noteData: NoteDataType
): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notes/update`,
      {
        method: "POST",
        headers: {
          user: token,
          noteData: JSON.stringify(noteData),
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};
