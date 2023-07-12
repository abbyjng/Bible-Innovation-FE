import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Page } from "../utils/types";
import { classNames } from "@/utils/helper";

interface Props {
  currentPage: Symbol;
}

const MenuBarTop: React.FC<Props> = ({ currentPage }) => {
  return (
    <div>
      <div className="flex w-full bg-gray-200 justify-between fixed top-0">
        <ul className="flex w-full bg-gray-200 justify-evenly fixed top-0">
          <li className="text-xl mt-2 mb-2">
            <a href="#">
              Genesis 1
            </a>
          </li>
          <li className="text-xl mt-2 mb-2">
            <a href="#">
              ESV
            </a>
          </li>
          <li className="text-xl mt-2 mb-2 group">
            <a href="#">
              Pages
            </a>
            <ul className="invisible group-hover:visible">
              <li>
                <Link
                  href="/"
                  className={classNames(
                    currentPage === Page.HOME ? "bg-gray-300" : "",
                    "p-1"
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/notes"
                  className={classNames(
                    currentPage === Page.NOTES ? "bg-gray-300" : "",
                    "p-1"
                  )}
                >
                  Notes
                </Link>
              </li>
              <li>
                <Link
                  href="/feed"
                  className={classNames(
                    currentPage === Page.FEED ? "bg-gray-300" : "",
                    "p-1"
                  )}
                >
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className={classNames(
                    currentPage === Page.PROFILE ? "bg-gray-300" : "",
                    "p-1"
                  )}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </li>
          <li className="text-xl mt-2 mb-2">
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBarTop;
