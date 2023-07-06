/* Bible reading page */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MenuBar from "@/components/MenuBar";
import { ChapterType, Page, VerseType } from "@/utils/types";
import Verse from "@/components/Verse";
import NoteEditor from "@/components/NoteEditor";
import { classNames } from "@/utils/helper";

export default function Home() {
  const router = useRouter();
  const book = useRef<string>(router.query?.book as string);
  const chapter = useRef<number>(router.query?.chapter as unknown as number);

  const [text, setText] = useState<ChapterType>();
  const [selectedVerse, setSelectedVerse] = useState<VerseType>();

  useEffect(() => {
    if (router.isReady && book.current && chapter.current) {
      setText(getText(book.current, chapter.current));
    } else if (router.isReady && (!book.current || !chapter.current)) {
      router.push("/");
    }
  }, [router, book, chapter]);

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
      setText(getText(book.current, chapter.current));
    }

    // set localStorage to the current viewing book and chapter so that the next load will use the same chapter
    localStorage.setItem("book", book.current);
    localStorage.setItem("chapter", `${chapter.current}`);
  }, [setText, book, chapter]);

  const getText = (book: string, chapter: number = 1): ChapterType => {
    // TODO: connect to backend
    return {
      book: "Genesis",
      chapter: 1,
      title: "The Creation of the World",
      sections: [
        {
          title: "",
          verses: [
            {
              number: 1,
              text: `In the beginning, God created the heavens and the earth.`,
            },
            {
              number: 2,
              text: `The earth was without form and void, and darkness was over
              the face of the deep. And the Spirit of God was hovering over the face of
              the waters.`,
            },
            {
              number: 3,
              text: `And God said, “Let there be light,” and there was light.`,
            },
            {
              number: 4,
              text: `And God saw that the light was good. And God separated the light from the
              darkness.`,
            },
          ],
        },
      ],
    } as ChapterType;
  };
  return (
    <div>
      <div className="p-4 pb-20">
        <div className="text-xl font-bold my-4">
          {book.current} {chapter.current}
        </div>
        <div>
          <div className="font-semibold">{text?.title}</div>
          {text?.sections[0].verses.map((verse) => {
            return (
              <Verse
                key={verse.number}
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
