import React from "react";
import { Page, VerseType } from "../utils/types";
import { classNames } from "@/utils/helper";

interface Props {
  verse: VerseType;
  setSelectedVerse?: (verse: VerseType) => void;
}

const Verse: React.FC<Props> = ({ verse, setSelectedVerse }) => {
  const number = Object.keys(verse)[0];
  const text = verse[number];
  return (
    <span
      onClick={() => {
        if (setSelectedVerse) setSelectedVerse(verse);
      }}
    >
      <span className="text-xs px-1 align-text-top">{number}</span>
      <span>{text}</span>
    </span>
  );
};

export default Verse;
