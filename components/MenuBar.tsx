import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Page } from "../utils/types";
import { classNames } from "@/utils/helper";
import Selector from "./Selector";
import SearchIcon from "./icons/SearchIcon";
import { BOOKS, CHAPTER_COUNTS } from "../utils/constants";
import BookIcon from "./icons/BookIcon";
import CreateNoteIcon from "./icons/CreateNoteIcon";
import FeedIcon from "./icons/FeedIcon";
import ProfileIcon from "./icons/ProfileIcon";
import SearchPage from "./SearchPage";
import VerseSelector from "./VerseSelector";
import RootsIcon from "./icons/RootsIcon";

interface Props {
  currentPage: Symbol;
  hasBibleSelector?: boolean;
  selectedBook?: string;
  selectedChapter?: number;
  selectedVersion?: string;
  setSelectedBookChapter?: (book: string, chapter: number) => void;
  setSelectedVersion?: (version: string) => void;
  timer?: any;
}

const MenuBar: React.FC<Props> = ({
  currentPage,
  hasBibleSelector = false,
  selectedBook,
  selectedChapter,
  selectedVersion,
  setSelectedBookChapter,
  setSelectedVersion,
  timer,
}) => {
  const [navigationOpen, setNavigationOpen] = useState<boolean>(false);
  const [searchPageOpen, setSearchPageOpen] = useState<boolean>(false);
  const [timerPopupOpen, setTimerPopupOpen] = useState<boolean>(false);

  const pageAsString = (page: Symbol) => {
    switch (page) {
      case Page.HOME:
        return "Bible";
      case Page.NOTES:
        return "Notes";
      case Page.FEED:
        return "Feed";
      case Page.PROFILE:
        return "Profile";
      case Page.GROWING_ROOTS:
        return "Growing Roots";
      default:
        return "Page";
    }
  };

  const pageAsIcon = (page: Symbol) => {
    switch (page) {
      case Page.HOME:
        return <BookIcon className="fill-black" />;
      case Page.NOTES:
        return <CreateNoteIcon className="fill-black" />;
      case Page.FEED:
        return <FeedIcon className="fill-black" />;
      case Page.PROFILE:
        return <ProfileIcon className="fill-black" />;
      case Page.GROWING_ROOTS:
        return <RootsIcon className="fill-black" />;
      default:
        return "Page";
    }
  };

  return (
    <div>
      {navigationOpen && (
        <div className="absolute bottom-0 pb-[50px] h-screen w-screen flex flex-col">
          <div className="h-full" onClick={() => setNavigationOpen(false)} />
          <div className="w-full bg-white flex flex-col items-fill shadow">
            <Link href="/">
              <div
                className={classNames(
                  currentPage === Page.HOME ? "bg-gray-100" : "",
                  "w-full flex gap-10 px-9 py-4"
                )}
              >
                {pageAsIcon(Page.HOME)}
                {pageAsString(Page.HOME)}
              </div>
            </Link>
            <Link href="/growing-roots">
              <div
                className={classNames(
                  currentPage === Page.GROWING_ROOTS ? "bg-gray-100" : "",
                  "w-full flex gap-10 px-9 py-4 justify-center"
                )}
              >
                {pageAsIcon(Page.GROWING_ROOTS)}
                {pageAsString(Page.GROWING_ROOTS)}
              </div>
            </Link>
            <div className="h-px bg-black mx-9" />
            <Link href="/notes">
              <div
                className={classNames(
                  currentPage === Page.NOTES ? "bg-gray-100" : "",
                  "w-full flex gap-10 px-9 py-4"
                )}
              >
                {pageAsIcon(Page.NOTES)}
                {pageAsString(Page.NOTES)}
              </div>
            </Link>
            <div className="h-px bg-black mx-9" />
            <Link href="/feed">
              <div
                className={classNames(
                  currentPage === Page.FEED ? "bg-gray-100" : "",
                  "w-full flex gap-10 px-9 py-4"
                )}
              >
                {pageAsIcon(Page.FEED)}
                {pageAsString(Page.FEED)}
              </div>
            </Link>
            <div className="h-px bg-black mx-9" />
            <Link href="/profile">
              <div
                className={classNames(
                  currentPage === Page.PROFILE ? "bg-gray-100" : "",
                  "w-full flex gap-10 px-9 py-4"
                )}
              >
                {pageAsIcon(Page.PROFILE)}
                {pageAsString(Page.PROFILE)}
              </div>
            </Link>
          </div>
        </div>
      )}
      {timerPopupOpen && (
        <div
          className="absolute bottom-0 left-0 h-screen w-screen flex justify-center items-center"
          onClick={() => setTimerPopupOpen(false)}
        >
          <div className="bg-gray-300 rounded w-[90%] p-6 flex flex-col items-center gap-3">
            <div>
              Time left: <span className="font-bold">{timer}</span>
            </div>
            <div
              className="bg-gray-100 w-full p-2 text-center"
              onClick={() => {
                setNavigationOpen(true);
                setTimerPopupOpen(false);
              }}
            >
              Stop session
            </div>
            <div className="text-center text-sm">
              Leaving this session will result in not obtaining growth reward.
            </div>
          </div>
        </div>
      )}
      <div
        className={classNames(
          "grid w-full bg-gray-200 items-center px-2 z-50 relative h-[50px]",
          hasBibleSelector || timer ? "grid-cols-3" : "grid-cols-1"
        )}
      >
        {timer && <div className="text-lg flex justify-center">{timer}</div>}
        {hasBibleSelector &&
          selectedBook &&
          selectedChapter &&
          selectedVersion &&
          setSelectedBookChapter &&
          setSelectedVersion && (
            <VerseSelector
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              selectedVersion={selectedVersion}
              setSelectedBookChapter={setSelectedBookChapter}
              setSelectedVersion={setSelectedVersion}
            />
          )}
        <div className="text-xl mt-2 mb-2 justify-self-center">
          <div
            onClick={() => {
              if (timer) {
                setTimerPopupOpen(true);
              } else {
                setNavigationOpen(!navigationOpen);
              }
            }}
            className="cursor-pointer"
          >
            {pageAsIcon(currentPage)}
          </div>
        </div>
        {hasBibleSelector && (
          <div
            className="text-xl mt-2 mb-2 cursor-pointer justify-self-end"
            onClick={() => setSearchPageOpen(true)}
          >
            <SearchIcon className="w-6 h-6" />
          </div>
        )}
        {searchPageOpen && selectedVersion && (
          <SearchPage
            version={selectedVersion}
            hideSearchPage={() => setSearchPageOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MenuBar;
