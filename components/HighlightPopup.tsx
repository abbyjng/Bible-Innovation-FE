import React, { useRef, useEffect, useState } from "react";
import { VerseType } from "../utils/types";
import { classNames } from "@/utils/helper";
import { highlightOptions } from "@/utils/constants";
import CreateNoteIcon from "./icons/CreateNoteIcon";

interface Props {
  book: string;
  chapter: number;
  verse: VerseType;
  setHighlight: (highlight: string) => void;
  openNoteEditor: () => void;
}

const HighlightPopup: React.FC<Props> = ({
  book,
  chapter,
  verse,
  setHighlight,
  openNoteEditor,
}) => {
  const saveHighlight = (highlight: string) => {
    // TODO: save highlight data to backend
    setHighlight(highlight);
  };

  return (
    <div className="flex flex-col justify-end bg-white px-4 py-4 gap-4 shadow relative">
      <div className="flex justify-around">
        {highlightOptions.map((highlight, index) => {
          return (
            <div
              key={index}
              className={classNames("rounded-full w-6 h-6", highlight)}
              onClick={() => saveHighlight(highlight)}
            />
          );
        })}
      </div>
      <div className="h-px bg-black" />
      <div
        className="flex justify-center gap-3 items-center"
        onClick={openNoteEditor}
      >
        <CreateNoteIcon className="fill-black" />
        New Note
      </div>
    </div>
  );
};

export default HighlightPopup;
