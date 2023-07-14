/* Bible reading page */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MenuBar from "@/components/MenuBar";
import { ChapterType, Page, VerseType } from "@/utils/types";
import Verse from "@/components/Verse";
import NoteEditor from "@/components/NoteEditor";
import { classNames, getNumber } from "@/utils/helper";
import { getText } from "@/utils/orchestration";

export default function Home() {
  const router = useRouter();
  const book = useRef<string>();
  const chapter = useRef<number>();

  const [text, setText] = useState<ChapterType>();
  const [selectedVerse, setSelectedVerse] = useState<VerseType>();

  const checkLocalStorage = () => {
    const storedBook = localStorage.getItem("book") as string;
    const storedChapter = getNumber(localStorage.getItem("chapter"));

    // if the stored book and chapter are the same as what's displayed, change nothing
    if (
      storedBook === book.current &&
      getNumber(storedChapter) === chapter.current
    ) {
      return;
    }

    // if nothing was stored, go to Genesis 1
    book.current = storedBook || "Genesis";
    chapter.current = storedChapter || 1;
    setNewText(book.current, chapter.current);
  };

  const setNewText = (book: string, chapter: number) => {
    getText(book, chapter).then((text) => {
      if (!text) {
        router.push("500");
      } else if ("error" in text) {
        router.push("/");
      } else {
        setText(text);

        // set localStorage to the current viewing book and chapter so that the next load will use the same chapter
        localStorage.setItem("book", book);
        localStorage.setItem("chapter", `${chapter}`);
      }
    });
  };

  useEffect(() => {
    if (!router.isReady) return;

    // when the page loads, check for url book and chapter, and use those if available
    if (
      router.query?.book &&
      router.query?.chapter &&
      ((router.query?.chapter as unknown as number) !== chapter.current ||
        (router.query?.book as string) !== book.current)
    ) {
      book.current = router.query?.book as string;
      chapter.current = router.query?.chapter as unknown as number;
      setNewText(book.current, chapter.current);
    } else if (!router.query?.book || !router.query?.chapter) {
      // if the book or chapter is not defined in the url, check if there is a stored chapter
      checkLocalStorage();
    }
  });

  return (
    <div>
      <div className="p-4 pb-20">
        <div className="text-xl font-bold my-4">
          {text?.bookname} {text?.chapter}
        </div>
        <div>
          {text?.verses.map((verse) => {
            return (
              <Verse
                key={Object.keys(verse)[0]}
                verse={verse}
                setSelectedVerse={(verse) => {
                  setSelectedVerse(verse);
                }}
              />
            );
          })}
        </div>
      </div>
      {selectedVerse && (
        <div className="z-50 fixed bottom-0 w-full">
          <NoteEditor
            verse={selectedVerse}
            content={""}
            onSave={(content: string) => {
              setSelectedVerse(undefined);
              // TODO: send content to backend to save note
            }}
          />
        </div>
      )}
      <MenuBar
        currentPage={Page.HOME}
        hasBibleSelector
        selectedChapter={`${book.current} ${chapter.current}`}
        setSelectedChapter={(value) => {
          const [newBook, newChapter] = value.split(" ");
          router.push(`/?book=${newBook}&chapter=${newChapter}`);
        }}
        selectedVersion={"NEV"}
        setSelectedVersion={(value) => {}}
      />
    </div>
  );
}
