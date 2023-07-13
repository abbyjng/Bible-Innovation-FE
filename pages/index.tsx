/* Bible reading page */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MenuBar from "@/components/MenuBar";
import { ChapterType, Page, VerseType } from "@/utils/types";
import Verse from "@/components/Verse";
import NoteEditor from "@/components/NoteEditor";
import { classNames } from "@/utils/helper";
import { getText } from "@/utils/orchestration";

export default function Home() {
  const router = useRouter();
  const book = useRef<string>(router.query?.book as string);
  const chapter = useRef<number>(router.query?.chapter as unknown as number);

  const [text, setText] = useState<ChapterType>();
  const [selectedVerse, setSelectedVerse] = useState<VerseType>();

  useEffect(() => {
    if (router.isReady && book.current && chapter.current) {
      getText(book.current, chapter.current).then((text) => {
        if (!text) {
          router.push("500");
        } else {
          setText(text);
        }
      });
    } else if (router.isReady && (!book.current || !chapter.current)) {
      router.push("/");
    }
  }, [router, book, chapter]);

  useEffect(() => {
    if (
      router.isReady &&
      ((book.current !== router.query?.book && router.query?.book) ||
        (chapter.current !== (router.query?.chapter as unknown as number) &&
          router.query?.chapter))
    ) {
      book.current = router.query?.book as string;
      chapter.current = router.query?.chapter as unknown as number;
      getText(book.current, chapter.current).then((text) => {
        if (!text) {
          router.push("500");
        } else {
          setText(text);
        }
      });
    }
  });

  useEffect(() => {
    if (!book.current && !chapter.current) {
      // if the book and chapter are not defined in the url, check to see if any previous browsing was saved in localStorage
      const storedBook = localStorage.getItem("book") as string;
      const storedChapter = localStorage.getItem(
        "chapter"
      ) as unknown as number;
      // if nothing was stored, go to Genesis 1
      book.current = storedBook || "Genesis";
      chapter.current = storedChapter || 1;
      getText(book.current, chapter.current).then((text) => {
        if (!text) {
          router.push("500");
        } else {
          setText(text);
        }
      });
    }

    // set localStorage to the current viewing book and chapter so that the next load will use the same chapter
    localStorage.setItem("book", book.current);
    localStorage.setItem("chapter", `${chapter.current}`);
  }, [setText, book, chapter, router]);

  return (
    <div>
      <div className="p-4 pb-20">
        <div className="text-xl font-bold my-4">
          {book.current} {chapter.current}
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
      <MenuBar currentPage={Page.HOME} />
    </div>
  );
}
