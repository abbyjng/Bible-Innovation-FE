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

interface Props {
  currentPage: Symbol;
  hasBibleSelector?: boolean;
  selectedChapter?: string;
  setSelectedChapter?: (book: string) => void;
  selectedVersion?: string;
  setSelectedVersion?: (chapter: string) => void;
}

const MenuBar: React.FC<Props> = ({
  currentPage,
  hasBibleSelector = false,
  selectedChapter,
  setSelectedChapter,
  selectedVersion,
  setSelectedVersion,
}) => {
  const [navigationOpen, setNavigationOpen] = useState<boolean>(false);

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
      default:
        return "Page";
    }
  };

  return (
    <div>
      {navigationOpen && (
        <div className="absolute bottom-0 pb-[50px] w-full bg-gray-100 flex flex-col items-fill">
          <Link href="/">
            <div
              className={classNames(
                currentPage === Page.HOME ? "bg-gray-300" : "",
                "p-2 w-full flex gap-10"
              )}
            >
              {pageAsIcon(Page.HOME)}
              {pageAsString(Page.HOME)}
            </div>
          </Link>
          <Link href="/notes">
            <div
              className={classNames(
                currentPage === Page.NOTES ? "bg-gray-300" : "",
                "p-2 w-full flex gap-10"
              )}
            >
              {pageAsIcon(Page.NOTES)}
              {pageAsString(Page.NOTES)}
            </div>
          </Link>
          <Link href="/feed">
            <div
              className={classNames(
                currentPage === Page.FEED ? "bg-gray-300" : "",
                "p-2 w-full flex gap-10"
              )}
            >
              {pageAsIcon(Page.FEED)}
              {pageAsString(Page.FEED)}
            </div>
          </Link>
          <Link href="/profile">
            <div
              className={classNames(
                currentPage === Page.PROFILE ? "bg-gray-300" : "",
                "p-2 w-full flex gap-10"
              )}
            >
              {pageAsIcon(Page.PROFILE)}
              {pageAsString(Page.PROFILE)}
            </div>
          </Link>
        </div>
      )}
      <div
        className={classNames(
          "grid w-full bg-gray-200 fixed bottom-0 items-center px-2",
          hasBibleSelector ? "grid-cols-3" : "grid-cols-1"
        )}
      >
        {hasBibleSelector &&
          selectedChapter &&
          setSelectedChapter &&
          selectedVersion &&
          setSelectedVersion && (
            <div className="flex gap-2 justify-self-start">
              <Selector
                selected={selectedChapter}
                setSelected={setSelectedChapter}
                options={BOOKS.map((book) => {
                  return Array.from(
                    { length: CHAPTER_COUNTS[book] },
                    (_, i) => `${book} ${i + 1}`
                  );
                }).reduce(function (pre, cur) {
                  return pre.concat(cur);
                })}
              />
              <Selector
                selected={selectedVersion}
                setSelected={setSelectedVersion}
                options={["NET"]}
              />
            </div>
          )}
        <div className="text-xl mt-2 mb-2 justify-self-center">
          <div
            onClick={() => setNavigationOpen(!navigationOpen)}
            className="cursor-pointer"
          >
            {pageAsIcon(currentPage)}
          </div>
        </div>
        {hasBibleSelector && (
          <div className="text-xl mt-2 mb-2 cursor-pointer justify-self-end">
            <SearchIcon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
