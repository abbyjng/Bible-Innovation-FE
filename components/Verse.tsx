import React from "react";
import { Page, VerseType } from "../utils/types";
import { classNames } from "@/utils/helper";

interface Props {
  verse: VerseType;
  setSelectedVerse?: (verse: VerseType) => void;
}

const Verse: React.FC<Props> = ({ verse, setSelectedVerse }) => {
  return (
    <span
      onClick={() => {
        if (setSelectedVerse) setSelectedVerse(verse);
      }}
    >
      <span className="text-xs px-1 align-text-top">{verse.number}</span>
      <span>{verse.text}</span>
    </span>
  );
};

export default Verse;
