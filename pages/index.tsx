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
            {
              number: 5,
              text: `God called the light “day,” and the darkness he called “night.” And there was evening, and there was morning—the first day.`,
            },
            {
              number: 6,
              text: `And God said, “Let there be a vault between the waters to separate water from water.”`,
            },
            {
              number: 7,
              text: `So God made the vault and separated the water under the vault from the water above it. And it was so.`,
            },
            {
              number: 8,
              text: `God called the vault “sky.” And there was evening, and there was morning—the second day.`,
            },
            {
              number: 9,
              text: `And God said, “Let the water under the sky be gathered to one place, and let dry ground appear.” And it was so.`,
            },
            {
              number: 10,
              text: `God called the dry ground “land,” and the gathered waters he called “seas.” And God saw that it was good.`,
            },
            {
              number: 11,
              text: `Then God said, “Let the land produce vegetation: seed-bearing plants and trees on the land that bear fruit with seed in it, according to their various kinds.” And it was so.`,
            },
            {
              number: 12,
              text: `The land produced vegetation: plants bearing seed according to their kinds and trees bearing fruit with seed in it according to their kinds. And God saw that it was good.`,
            },
            {
              number: 13,
              text: `And there was evening, and there was morning—the third day.`,
            },
            {
              number: 14,
              text: `And God said, “Let there be lights in the vault of the sky to separate the day from the night, and let them serve as signs to mark sacred times, and days and years,`,
            },
            {
              number: 15,
              text: `and let them be lights in the vault of the sky to give light on the earth.” And it was so.`,
            },
            {
              number: 16,
              text: `God made two great lights—the greater light to govern the day and the lesser light to govern the night. He also made the stars.`,
            },
            {
              number: 17,
              text: `God set them in the vault of the sky to give light on the earth,`,
            },
            {
              number: 18,
              text: `to govern the day and the night, and to separate light from darkness. And God saw that it was good.`,
            },
            {
              number: 19,
              text: `And there was evening, and there was morning—the fourth day.`,
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
