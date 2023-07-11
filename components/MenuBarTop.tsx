import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Page } from "../utils/types";
import { classNames } from "@/utils/helper";

interface Props {
  currentPage: Symbol;
}

const MenuBarTop: React.FC<Props> = ({ currentPage }) => {
  return (
    <div className="flex w-full bg-gray-200 justify-between fixed top-0">
      <Link
        href="/"
        className={classNames(
          currentPage === Page.HOME ? "bg-gray-300" : "",
          "p-4"
        )}
      >
        Home
      </Link>
      <Link
        href="/notes"
        className={classNames(
          currentPage === Page.NOTES ? "bg-gray-300" : "",
          "p-4"
        )}
      >
        Notes
      </Link>
      <Link
        href="/feed"
        className={classNames(
          currentPage === Page.FEED ? "bg-gray-300" : "",
          "p-4"
        )}
      >
        Feed
      </Link>
      <Link
        href="/profile"
        className={classNames(
          currentPage === Page.PROFILE ? "bg-gray-300" : "",
          "p-4"
        )}
      >
        Profile
      </Link>
    </div>
  );
};

export default MenuBarTop;
