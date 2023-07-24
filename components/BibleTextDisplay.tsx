import { ChapterType, VerseType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import Verse from "./Verse";
import NoteEditor from "./NoteEditor";
import HighlightPopup from "./HighlightPopup";
import { useRouter } from "next/router";

interface Props {
  text: ChapterType;
}

const BibleTextDisplay: React.FC<Props> = ({ text }) => {
  const [selectedVerse, setSelectedVerse] = useState<VerseType>();
  const [highlightPopupOpen, setHighlightPopupOpen] = useState<boolean>(false);
  const [noteEditorOpen, setNoteEditorOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [scrollVerse, setScrollVerse] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    if (text && router.query?.verse && router.query?.verse !== scrollVerse) {
      setScrollVerse(router.query?.verse as string);
    }
  }, [text, router, scrollVerse]);

  useEffect(() => {
    if (text) {
      setHighlights(Array(text.verses.length).fill(""));
    }
  }, [text]);

  return (
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
                routerVerse={Object.keys(verse)[0] === scrollVerse}
              />
            );
          })}
        </div>
      </div>
      {noteEditorOpen && selectedVerse && (
        <div className="w-full">
          <NoteEditor
            book={text.bookname}
            chapter={text.chapter || 0}
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
            book={text.bookname || ""}
            chapter={text.chapter || 0}
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
  );
};

export default BibleTextDisplay;
