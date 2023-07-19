import { ChapterType } from "./types";

export const getText = async (
  book: string,
  chapter: number
): Promise<ChapterType | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/bible/?book=${book}&chapter=${chapter}`,
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

export const signIn = async (email: string, password: string): Promise<any> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
      method: "POST",
      headers: {
        email: email,
        password: password,
      },
    });
    const result = { result: await response.text(), status: response.status };

    return result;
  } catch (e) {
    console.log("Error: ", e);
  }
};
