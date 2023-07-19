/* Personal notes viewing and editing page */

import { useEffect, useRef, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { NoteDataType, Page } from "@/utils/types";
import { Editor } from "@tinymce/tinymce-react";
import { useAuth } from "@/auth_context";
import Loader from "@/components/Loader";

export default function Notes() {
  const [notes, setNotes] = useState<NoteDataType[]>([]);
  const { loading, isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    // checks if the user is authenticated
    if (!loading && !isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, loading, logout]);

  if (loading || !user) {
    return <Loader />;
  }

  const getNotes = () => {
    // TODO: connect to backend
    return;
  };

  return (
    <div className="">
      <MenuBar currentPage={Page.NOTES} />
      <div className="p-2 pb-20">
        <body className="mt-7">
          <div className="bg-gray-300 ml-4 inline-block w-20">
            <a href="#" className="text-center">
              <p className="pt-2.5 pb-2.5">Folder</p>
            </a>
          </div>

          <div className="bg-gray-300 ml-4 inline-block w-20">
            <a href="#" className="text-center">
              <p className="pt-2.5 pb-2.5">Folder</p>
            </a>
          </div>

          <div className="bg-gray-300 ml-4 inline-block w-20">
            <a href="#" className="text-center">
              <p className="pt-2.5 pb-2.5">Folder</p>
            </a>
          </div>

          <div className="ml-4 mr-4 mt-4 mb-4">
            <ul>
              <li className="border-b-4 border-black">
                <a href="#">
                  <p className="mb-2">Note Title</p>
                </a>
              </li>

              <li className="border-b-4 border-black">
                <a href="#">
                  <p className="mt-2 mb-2">Note Title</p>
                </a>
              </li>
            </ul>
          </div>

          <h3 className="ml-4 text-xl font-bold">Shared Notes</h3>
          <div className="ml-4 mr-4 mt-4 mb-4">
            <ul>
              <li className="border-b-4 border-black">
                <a href="#">
                  <p className="mb-2">Note Title</p>
                </a>
              </li>

              <li className="border-b-4 border-black">
                <a href="#">
                  <p className="mt-2 mb-2">Note Title</p>
                </a>
              </li>
            </ul>
          </div>
        </body>
      </div>
    </div>
  );
}
