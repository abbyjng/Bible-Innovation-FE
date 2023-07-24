/* Bible reading page */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MenuBar from "@/components/MenuBar";
import { ChapterType, NoteDataType, Page, VerseType } from "@/utils/types";
import Verse from "@/components/Verse";
import NoteEditor from "@/components/NoteEditor";
import { classNames, getNumber } from "@/utils/helper";
import { getText } from "@/utils/orchestration";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";
import HighlightPopup from "@/components/HighlightPopup";
import BibleTextDisplay from "@/components/BibleTextDisplay";

export default function Home() {
  const router = useRouter();
  const book = useRef<string>();
  const chapter = useRef<number>();
  const version = useRef<string>();

  const [text, setText] = useState<ChapterType>();
  const [notes, setNotes] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);

  const checkLocalStorage = () => {
    const storedBook = localStorage.getItem("book") as string;
    const storedChapter = getNumber(localStorage.getItem("chapter"));
    const storedVersion = localStorage.getItem("version") as string;

    // if the stored book and chapter are the same as what's displayed, change nothing
    if (
      storedBook === book.current &&
      getNumber(storedChapter) === chapter.current &&
      storedVersion === version.current
    ) {
      return;
    }

    // if nothing was stored, go to Genesis 1
    book.current = storedBook || "Genesis";
    chapter.current = storedChapter || 1;
    version.current = storedVersion || "NET";
    setNewText(book.current, chapter.current, version.current);
  };

  const setNewText = (book: string, chapter: number, version: string) => {
    getText(book, chapter, version).then((text) => {
      if (!text) {
        router.push("500");
      } else if ("error" in text) {
        router.push("/");
      } else {
        setText(text);
        setHighlights(Array(text.verses.length).fill(""));

        // set localStorage to the current viewing book, chapter, and version so that the next load will use the same chapter
        localStorage.setItem("book", book);
        localStorage.setItem("chapter", `${chapter}`);
        localStorage.setItem("version", version);
      }
    });
  };

  useEffect(() => {
    if (!router.isReady) return;

    // when the page loads, check for url book, chapter, and version, and use those if available
    if (
      router.query?.book &&
      router.query?.chapter &&
      router.query?.version &&
      ((router.query?.chapter as unknown as number) !== chapter.current ||
        (router.query?.book as string) !== book.current ||
        (router.query?.version as string) !== version.current)
    ) {
      book.current = router.query?.book as string;
      chapter.current = router.query?.chapter as unknown as number;
      version.current = router.query?.version as string;
      setNewText(book.current, chapter.current, version.current);
    } else if (
      !router.query?.book ||
      !router.query?.chapter ||
      !router.query?.version
    ) {
      // if the book, chapter, or version is not defined in the url, check if there is a stored chapter
      checkLocalStorage();
    }
  });

  if (!text) {
    return <Loader />;
  }

  return (
    <PageLayout
      menuBar={
        <MenuBar
          currentPage={Page.HOME}
          hasBibleSelector
          selectedBook={book.current}
          selectedChapter={chapter.current}
          setSelectedBookChapter={(newBook, newChapter) => {
            router.push(
              `/?book=${newBook}&chapter=${newChapter}&version=${version.current}`
            );
          }}
          selectedVersion={version.current}
          setSelectedVersion={(newVersion) => {
            router.push(
              `/?book=${book.current}&chapter=${chapter.current}&version=${newVersion}`
            );
          }}
        />
      }
    >
      <BibleTextDisplay text={text} />
    </PageLayout>
  );
}
