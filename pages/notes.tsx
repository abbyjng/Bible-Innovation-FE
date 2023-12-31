/* Personal notes viewing and editing page */

import { ReactNode, useEffect, useRef, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { NoteDataType, Page } from "@/utils/types";
import { useAuth } from "@/UserContext";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";
import { getNotes, createOrUpdateNote } from "@/utils/orchestration";
import { useRouter } from "next/router";
import NoteEditor from "@/components/NoteEditor";
import Link from "next/link";
import CloseIcon from "@/components/icons/CloseIcon";

export default function Notes() {
  const [notes, setNotes] = useState<NoteDataType[]>([]);
  const [openNote, setOpenNote] = useState<NoteDataType>();

  const { loading, isAuthenticated, user, logout, token } = useAuth();

  const router = useRouter();

  useEffect(() => {
    // checks if the user is authenticated
    if (!loading && !isAuthenticated) {
      localStorage.setItem("nextPage", "/notes");
      logout();
    }
  }, [isAuthenticated, loading, logout]);

  useEffect(() => {
    if (!loading && token) {
      getNotes(token).then((notes) => {
        if (notes) {
          setNotes(notes);
        } else {
          throw Error("Couldn't fetch notes.");
        }
      });
    }
  }, [loading, token]);

  if (loading || !user || !token) {
    return <Loader />;
  }

  const handleSave = (
    book: string,
    chapter: number,
    verse: number,
    content: string
  ) => {
    const now = new Date().getTime();
    const noteData: NoteDataType = {
      book: book,
      chapter: chapter,
      verse: verse,
      note: content,
      timestamp: now,
      shared: false,
    };
    createOrUpdateNote(token, noteData);

    const newNotes = notes.map((note) => {
      if (
        note.book === book &&
        note.chapter === chapter &&
        note.verse === verse
      ) {
        return noteData;
      } else {
        return note;
      }
    });

    setNotes(newNotes);
  };

  const toggleVisibility = () => {
    if (!openNote) return;
    const now = new Date().getTime();
    const noteData: NoteDataType = {
      book: openNote.book,
      chapter: openNote.chapter,
      verse: openNote.verse,
      note: openNote.note,
      timestamp: now,
      shared: !openNote.shared,
    };
    createOrUpdateNote(token, noteData);

    const newNotes = notes.map((note) => {
      if (
        note.book === openNote.book &&
        note.chapter === openNote.chapter &&
        note.verse === openNote.verse
      ) {
        return noteData;
      } else {
        return note;
      }
    });

    setNotes(newNotes);
    setOpenNote(noteData);
  };

  return (
    <PageLayout menuBar={<MenuBar currentPage={Page.NOTES} />}>
      {openNote && (
        <div className="z-[100] absolute flex flex-col justify-end w-screen h-screen bg-white">
          <div
            className="absolute top-6 right-6 cursor-pointer"
            onClick={() => setOpenNote(undefined)}
          >
            <CloseIcon className="fill-black" />
          </div>
          <div
            className="bg-gray-200 mx-[10%] px-4 py-2 rounded cursor-pointer text-center"
            onClick={toggleVisibility}
          >
            {openNote.shared ? "Hide from profile" : "Publish to profile"}
          </div>
          <NoteEditor
            book={openNote.book}
            chapter={openNote.chapter}
            verse={openNote.verse}
            content={openNote.note}
            height="70vh"
            hideNoteEditor={() => {
              setOpenNote(undefined);
            }}
            handleSave={handleSave}
          />
        </div>
      )}
      <div className="p-2 pb-20 mt-7">
        <div className="m-4 gap-4 justify-around">
          {notes.map((note, index) => {
            return (
              <div className="w-full flex flex-col" key={index}>
                <div
                  className="flex flex-col gap-2 p-4 border border-black mb-2 h-full cursor-pointer"
                  dangerouslySetInnerHTML={{ __html: note.note }}
                  onClick={() => setOpenNote(note)}
                />
                <div className="flex flex-wrap justify-between mb-2 ">
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/?book=${note.book}&chapter=${note.chapter}&verse=${
                          note.verse
                        }&version=${
                          (localStorage.getItem("version") as string) || "NET"
                        }`
                      )
                    }
                  >
                    {note.book} {note.chapter}:{note.verse}
                  </div>
                  <div className="text-gray-400">
                    {new Date(note.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            );
          })}
          {notes.length === 0 && (
            <div className="h-[80vh] w-full flex flex-col justify-center text-center">
              <div>
                No notes created. Click on a verse in the{" "}
                <Link className="text-slateGray underline" href="/">
                  Bible
                </Link>{" "}
                tab to create a note.
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
