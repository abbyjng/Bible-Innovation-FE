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

export default function Home() {
  const router = useRouter();
  const book = useRef<string>();
  const chapter = useRef<number>();

  const [text, setText] = useState<ChapterType>();
  const [selectedVerse, setSelectedVerse] = useState<VerseType>();
  const [highlightPopupOpen, setHighlightPopupOpen] = useState<boolean>(false);
  const [noteEditorOpen, setNoteEditorOpen] = useState<boolean>(false);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [scrollVerse, setScrollVerse] = useState<string>();

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
        setHighlights(Array(text.verses.length).fill(""));

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

  useEffect(() => {
    if (text && router.query?.verse && router.query?.verse !== scrollVerse) {
      setScrollVerse(router.query?.verse as string);
    }
  }, [text, router, scrollVerse]);

  if (!text) {
    return <Loader />;
  }

  return (
    <PageLayout
      menuBar={
        <MenuBar
          currentPage={Page.HOME}
          hasBibleSelector
          selectedChapter={`${book.current} ${chapter.current}`}
          setSelectedChapter={(value) => {
            const newBook = value.substring(0, value.lastIndexOf(" "));
            const newChapter = value.substring(
              value.lastIndexOf(" ") + 1,
              value.length
            );
            router.push(`/?book=${newBook}&chapter=${newChapter}`);
          }}
          selectedVersion={"NET"}
          setSelectedVersion={(value) => {}}
        />
      }
    >
      <div className="h-full flex flex-col justify-between">
        <div
          className="p-4 overflow-scroll"
          onClick={() => {
            if (selectedVerse) {
              setHighlightPopupOpen(false);
              setNoteEditorOpen(false);
              setSelectedVerse(undefined);
            }
          }}
        >
          <div className="text-xl font-bold my-4">
            {text?.bookname} {text?.chapter}
          </div>
          <div>
            {text?.verses.map((verse, index) => {
              return (
                <Verse
                  key={Object.keys(verse)[0]}
                  verse={verse}
                  isSelected={selectedVerse === verse}
                  setSelectedVerse={(verse) => {
                    setSelectedVerse(verse);
                    setNoteEditorOpen(false);
                    setHighlightPopupOpen(true);
                  }}
                  highlight={highlights[index]}
                  shouldScroll={Object.keys(verse)[0] === scrollVerse}
                />
              );
            })}
          </div>
        </div>
        {noteEditorOpen && selectedVerse && (
          <div className="w-full">
            <NoteEditor
              book={book.current || ""}
              chapter={chapter.current || 0}
              verse={selectedVerse}
              content={""}
              hideNoteEditor={() => {
                setNoteEditorOpen(false);
                setSelectedVerse(undefined);
              }}
            />
          </div>
        )}

        {highlightPopupOpen && selectedVerse && (
          <div className="w-full">
            <HighlightPopup
              book={book.current || ""}
              chapter={chapter.current || 0}
              verse={selectedVerse}
              setHighlight={(highlight: string) => {
                let newHighlights = highlights.map((h, i) =>
                  `${i + 1}` === Object.keys(selectedVerse)[0] ? highlight : h
                );
                setHighlights(newHighlights);
              }}
              openNoteEditor={() => {
                setNoteEditorOpen(true);
                setHighlightPopupOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
