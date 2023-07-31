/* Bible reading page */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MenuBar from "@/components/MenuBar";
import { ChapterType, NoteDataType, Page } from "@/utils/types";
import { getNumber, isNextDay } from "@/utils/helper";
import { getChapterNotes, getText } from "@/utils/orchestration";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";
import BibleTextDisplay from "@/components/BibleTextDisplay";
import { useAuth } from "@/UserContext";

export default function Home() {
  const router = useRouter();
  const book = useRef<string>();
  const chapter = useRef<number>();
  const version = useRef<string>();

  const [hasCheckedStreak, setHasCheckedStreak] = useState<boolean>();
  const [text, setText] = useState<ChapterType>();
  const [notes, setNotes] = useState<NoteDataType[]>([]);

  const { loading, user, streak, updateStreak, token } = useAuth();

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

  const setNewText = async (book: string, chapter: number, version: string) => {
    await getText(book, chapter, version).then((text) => {
      if (!text) {
        localStorage.removeItem("book");
        localStorage.removeItem("chapter");
        localStorage.removeItem("version");
        router.push("500");
      } else if ("error" in text) {
        router.push("/");
      } else {
        setText(text);

        // set localStorage to the current viewing book, chapter, and version so that the next load will use the same chapter
        localStorage.setItem("book", book);
        localStorage.setItem("chapter", `${chapter}`);
        localStorage.setItem("version", version);
      }
    });
  };

  useEffect(() => {
    if (token) {
      getChapterNotes(
        token,
        book.current as string,
        chapter.current as number
      ).then((notes) => {
        if (!notes) {
          throw Error(`Couldn't fetch notes for ${book} ${chapter}`);
        }
        const newNotes: NoteDataType[] = Array.apply(
          undefined,
          Array(text?.verses.length)
        ) as NoteDataType[];
        notes.forEach((note) => {
          newNotes[note.verse] = note;
        });
        setNotes(newNotes);
      });
    }
  });

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

  useEffect(() => {
    if (!hasCheckedStreak) {
      const now = new Date();
      if (streak && !loading) {
        const status = isNextDay(streak.lastIncrement);
        if (status === 1) {
          updateStreak(streak.count + 1, now.getTime());
        } else if (status === 0) {
          updateStreak(1, now.getTime());
        }
      }
      setHasCheckedStreak(true);
    }
  }, [hasCheckedStreak, loading, streak, updateStreak]);

  if (!text || loading) {
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
      <BibleTextDisplay text={text} loggedIn={!!user} notes={notes} />
    </PageLayout>
  );
}
