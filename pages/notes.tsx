/* Personal notes viewing and editing page */

import { ReactNode, useEffect, useRef, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { NoteDataType, Page } from "@/utils/types";
import { Editor } from "@tinymce/tinymce-react";
import { useAuth } from "@/UserContext";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";

export default function Notes() {
  const [notes, setNotes] = useState<NoteDataType[]>([]);
  const { loading, isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    // checks if the user is authenticated
    if (!loading && !isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, loading, logout]);

  useEffect(() => {
    const note = localStorage.getItem("noteSaveData");
    if (note) {
      setNotes([JSON.parse(note)]);
    }
  }, [setNotes]);

  if (loading || !user) {
    return <Loader />;
  }

  const getNotes = () => {
    // TODO: connect to backend
    return;
  };

  return (
    <PageLayout menuBar={<MenuBar currentPage={Page.NOTES} />}>
      <div className="p-2 pb-20">
        <div className="mt-7">
          <div className="bg-gray-300 ml-4 inline-block w-20">
            <a href="#" className="text-center">
              <p className="py-2.5">Folder</p>
            </a>
          </div>

          <div className="bg-gray-300 ml-4 inline-block w-20">
            <a href="#" className="text-center">
              <p className="py-2.5">Folder</p>
            </a>
          </div>

          <div className="bg-gray-300 ml-4 inline-block w-20">
            <a href="#" className="text-center">
              <p className="py-2.5">Folder</p>
            </a>
          </div>

          <div className="m-4">
            {notes.map((note, index) => {
              return (
                <div className="p-4 bg-gray-200 rounded" key={index}>
                  <div className="mb-2 text-lg font-bold">
                    {note.book} {note.chapter}:{note.verse}
                  </div>
                  <div
                    className="flex flex-col gap-2"
                    dangerouslySetInnerHTML={{ __html: note.note }}
                  />
                </div>
              );
            })}
          </div>

          <h3 className="ml-4 text-xl font-bold">Shared Notes</h3>
          <div className="m-4">
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
        </div>
      </div>
    </PageLayout>
  );
}
