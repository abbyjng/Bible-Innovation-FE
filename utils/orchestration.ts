import { ChapterType, SearchPageType } from "./types";

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
    return { ...result, page: Number(result.page) }; // TODO: temp fix for the page returning as string
  } catch (e) {
    console.log("Error: ", e);
  }
};
