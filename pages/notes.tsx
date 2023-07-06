/* Personal notes viewing and editing page */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MenuBar from "@/components/MenuBar";
import { Page } from "@/utils/types";

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]); // TODO: figure out typing

  const getNotes = () => {
    // TODO: connect to backend
    return;
  };
  return (
    <div className="">
      <div className="p-2 pb-20">
        <header>
          <div className="text-2xl font-bold text-right mr-4">
            Menu
          </div>
        </header>

        <body>
          <div className="bg-gray-300 ml-4 inline-block w-40">
            <a href="#" className="text-center">
              <p className="pt-2.5 pb-2.5">
                Folder
              </p>
            </a>
          </div>

          <div className="bg-gray-300 ml-4 inline-block w-40">
            <a href="#" className="text-center">
              <p className="pt-2.5 pb-2.5">
                Folder
              </p>
            </a>
          </div>

          <div className="bg-gray-300 ml-4 inline-block w-40">
            <a href="#" className="text-center">
              <p className="pt-2.5 pb-2.5">
                Folder
              </p>
            </a>
          </div>

          <div className="ml-4 mr-4 mt-4 mb-4">
            <ul>
              <li className="border-b-4 border-black">
                <a href="#">
                  <p className="mb-2">
                    Note Title
                  </p>
                </a>
              </li>

              <li className="border-b-4 border-black">
                <a href="#">
                  <p className="mt-2 mb-2">
                    Note Title
                  </p>
                </a>
              </li>
            </ul>
          </div>

          <h3 className="ml-4 text-xl font-bold">
            Shared Notes
          </h3>
          <div className="ml-4 mr-4 mt-4 mb-4">
            <ul>
              <li className="border-b-4 border-black">
                <a href="#">
                  <p className="mb-2">
                    Note Title
                  </p>
                </a>
              </li>

              <li className="border-b-4 border-black">
                <a href="#">
                  <p className="mt-2 mb-2">
                    Note Title
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </body>
      </div>

      <MenuBar currentPage={Page.NOTES} />
    </div>
  );
}
