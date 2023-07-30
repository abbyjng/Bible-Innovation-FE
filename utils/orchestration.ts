import {
  ChapterType,
  NoteDataType,
  PostType,
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

export const getPublicNotes = async (
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

export const getFollowedPosts = async (
  token: string
): Promise<PostType[] | undefined> => {
  try {
    console.log("here!");
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/notes/followed/?user=${token}`,
    //   {
    //     method: "GET",
    //   }
    // );
    // const result = await response.json();
    // return result;

    return [
      {
        uid: "1234",
        displayName: "CatsareCool78",
        photoURL:
          "https://www.thesprucepets.com/thmb/uQnGtOt9VQiML2oG2YzAmPErrHo=/5441x0/filters:no_upscale():strip_icc()/all-about-tabby-cats-552489-hero-a23a9118af8c477b914a0a1570d4f787.jpg",
        post: {
          book: "Genesis",
          chapter: 1,
          verse: 5,
          note: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
          created: 1690203083897,
        },
      },
      {
        uid: "1234",
        displayName: "Nemo",
        photoURL:
          "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM2NTI5fQ",
        post: {
          book: "Genesis",
          chapter: 1,
          verse: 3,
          note: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
          created: 1690101083897,
        },
      },
      {
        uid: "1234",
        displayName: "DogFan20",
        photoURL:
          "https://www.science.org/do/10.1126/science.aba2340/abs/dogs_1280p_0.jpg",
        post: {
          book: "Genesis",
          chapter: 1,
          verse: 10,
          note: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
          created: 1690302083897,
        },
      },
    ];
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
