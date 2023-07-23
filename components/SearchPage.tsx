import React, { useEffect, useState } from "react";
import SearchIcon from "./icons/SearchIcon";
import { SearchPageType, SearchType } from "@/utils/types";
import { search } from "@/utils/orchestration";
import LoadingIcon from "./icons/LoadingIcon";
import ArrowIcon from "./icons/ArrowIcon";
import { useRouter } from "next/router";
import CloseIcon from "./icons/CloseIcon";

interface Props {
  version: string;
  hideSearchPage: () => void;
}

const SearchPage: React.FC<Props> = ({ version, hideSearchPage }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [results, setResults] = useState<SearchPageType>();
  const [content, setContent] = useState<SearchType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (searchVal !== "") {
      const timeoutId = setTimeout(async () => {
        setLoading(true);
        setResults(undefined);
        const searchResult = await search(version, searchVal, 10);
        setResults(searchResult);
        setContent(searchResult?.content as SearchType[]);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchVal, version]);

  const getNextPage = async () => {
    if (!results) {
      console.error("Something went wrong");
      return;
    }
    const searchResult = await search(
      version,
      searchVal,
      10,
      results?.page + 1
    );
    if (!searchResult) {
      console.error("Something went wrong");
      return;
    }
    setResults(searchResult);
    setContent([...content, ...searchResult.content]);
  };

  return (
    <div className="h-screen w-screen bg-white absolute bottom-0 left-0">
      <div className="flex flex-col p-4 pt-20 gap-3">
        <div
          className="absolute top-8 right-8"
          onClick={() => hideSearchPage()}
        >
          <CloseIcon className="fill-black" />
        </div>
        <div className="relative">
          <input
            autoFocus
            placeholder="Search"
            type="text"
            className="bg-gray-200 rounded p-2 pl-9 w-full"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
          />
          <div className="absolute top-2.5 left-2">
            <SearchIcon className="stroke-black h-5 w-5" />
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-between">
          {content.map((searchResult: SearchType, index) => {
            return (
              <div
                key={index}
                className="bg-gray-100 rounded p-4 flex items-center gap-3"
                onClick={() => {
                  router.push(
                    `/?book=${searchResult.book}&chapter=${searchResult.chapter}&verse=${searchResult.verse}`
                  );
                  hideSearchPage();
                }}
              >
                <div>
                  <div className="font-semibold mb-2">
                    {searchResult.book} {searchResult.chapter}:
                    {searchResult.verse}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: searchResult.text }}
                  />
                </div>
                <div>
                  <ArrowIcon className="fill-black -rotate-90" />
                </div>
              </div>
            );
          })}
          {content.length === 0 && !loading && searchVal !== "" && (
            <div className="text-center mt-10">No search results found.</div>
          )}
          {!loading && searchVal === "" && (
            <div className="text-center mt-10">
              Type in the search bar above to find matching passages.
            </div>
          )}
          {results && results.pageCount > results.page && (
            <div
              className="bg-gray-200 w-full p-3 text-center cursor-pointer"
              onClick={getNextPage}
            >
              Show more
            </div>
          )}
        </div>
        {loading && (
          <div className="h-[200px] w-full flex items-center justify-center">
            <div className="animate-spin h-24 w-24">
              <LoadingIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
