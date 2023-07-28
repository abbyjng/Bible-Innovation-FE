import React, { useEffect, useState } from "react";
import Selector from "./Selector";
import SearchIcon from "./icons/SearchIcon";
import { getVersionInfo, getVersions } from "@/utils/orchestration";
import { useRouter } from "next/router";
import { VersionInfoType } from "@/utils/types";
import Loader from "./Loader";
import { classNames } from "@/utils/helper";
import ArrowIcon from "./icons/ArrowIcon";
import SearchPage from "./SearchPage";

interface Props {
  selectedBook: string;
  selectedChapter: number;
  selectedVersion: string;
  setSelectedBookChapter: (book: string, chapter: number) => void;
  setSelectedVersion: (version: string) => void;
}

const VerseSelector: React.FC<Props> = ({
  selectedBook,
  selectedChapter,
  selectedVersion,
  setSelectedBookChapter,
  setSelectedVersion,
}) => {
  const [verseSelectorOpen, setVerseSelectorOpen] = useState<boolean>(false);
  const [versions, setVersions] = useState<string[]>([]);
  const [versionInfo, setVersionInfo] = useState<VersionInfoType>();
  const [testament, setTestament] = useState<string>("OT");
  const [book, setBook] = useState<string>();
  const [numChapters, setNumChapters] = useState<number>();
  const [chapter, setChapter] = useState<number>();
  const [searchPageOpen, setSearchPageOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (versions.length === 0) {
      getVersions().then((versions) => {
        if (!versions) {
          router.push("500");
        } else {
          setVersions(versions);
        }
      });
    }

    if (!versionInfo) {
      getVersionInfo(selectedVersion).then(
        (versionInfo: VersionInfoType | undefined) => {
          if (!versionInfo) {
            localStorage.removeItem("version");
            router.push("500");
          } else {
            setVersionInfo(versionInfo);
          }
        }
      );
    }
  });

  useEffect(() => {
    if (book && chapter) {
      setSelectedBookChapter(book, chapter);
      setVerseSelectorOpen(false);
      setBook(undefined);
      setChapter(undefined);
    }
  }, [setSelectedBookChapter, book, chapter, router]);

  if (!versionInfo) {
    return <Loader />;
  }

  return (
    <div className="flex gap-2 justify-self-start overflow-scroll">
      <div
        className="bg-white rounded px-2 py-0.5 whitespace-nowrap cursor-pointer"
        onClick={() => setVerseSelectorOpen(true)}
      >
        {selectedBook} {selectedChapter}
      </div>
      <Selector
        selected={selectedVersion}
        setSelected={setSelectedVersion}
        options={versions}
      />
      {verseSelectorOpen && (
        <div className="absolute z-[55] left-0 bottom-0 w-screen h-screen bg-white flex flex-col justify-between text-start">
          <div
            className={classNames(
              "overflow-scroll p-8",
              !book ? "" : "flex flex-wrap justify-start"
            )}
          >
            <div
              className="flex gap-3 items-center mb-6 w-full cursor-pointer"
              onClick={() => {
                setBook(undefined);
                setVerseSelectorOpen(false);
              }}
            >
              <ArrowIcon className="fill-black rotate-90" />
              Back
            </div>
            {!book &&
              (testament === "OT" ? versionInfo.OT : versionInfo.NT).map(
                (book, index) => {
                  const bookName = Object.keys(book)[0];
                  const numChapters = book[bookName];
                  return (
                    <div
                      key={index}
                      className="w-full py-3.5 cursor-pointer"
                      onClick={() => {
                        setBook(bookName);
                        setNumChapters(numChapters);
                      }}
                    >
                      {bookName}
                    </div>
                  );
                }
              )}
            {book && numChapters && (
              <div className="font-bold w-full">{book}</div>
            )}
            {book &&
              numChapters &&
              Array.apply(null, Array(numChapters)).map((_, index) => {
                const chapterNum = index + 1;
                return (
                  <div
                    key={chapterNum}
                    className="h-[65px] w-[65px] flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      setChapter(chapterNum);
                    }}
                  >
                    {chapterNum}
                  </div>
                );
              })}
          </div>
          <div className="w-full flex flex-col shadow">
            {!book && (
              <div className="w-full flex justify-around p-5">
                <div
                  className={classNames(
                    testament === "OT" ? "font-bold" : "cursor-pointer"
                  )}
                  onClick={() => {
                    setBook(undefined);
                    setTestament("OT");
                  }}
                >
                  Old Testament
                </div>
                <div
                  onClick={() => setSearchPageOpen(true)}
                  className="cursor-pointer"
                >
                  <SearchIcon className="stroke-black h-5 w-5" />
                </div>
                <div
                  className={classNames(
                    testament === "NT" ? "font-bold" : "cursor-pointer"
                  )}
                  onClick={() => {
                    setBook(undefined);
                    setTestament("NT");
                  }}
                >
                  New Testament
                </div>
                {searchPageOpen && selectedVersion && (
                  <SearchPage
                    version={selectedVersion}
                    hideSearchPage={() => setSearchPageOpen(false)}
                  />
                )}
              </div>
            )}
            <div className="w-full flex justify-around p-5 bg-slateGray text-white">
              <div className={!book ? "font-bold" : ""}>Book</div>
              <div className={book ? "font-bold" : ""}>Chapter</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerseSelector;
