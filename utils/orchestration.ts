import { ChapterType } from "./types";

export const getText = async (
  book: string,
  chapter: number = 1
): Promise<ChapterType | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bible/?book=${book}&chapter=${chapter}`,
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
