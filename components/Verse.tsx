import React from "react";
import { Page, VerseType } from "../utils/types";
import { classNames } from "@/utils/helper";

interface Props {
  verse: VerseType;
  isSelected: boolean;
  setSelectedVerse?: (verse: VerseType) => void;
}

const Verse: React.FC<Props> = ({ verse, isSelected, setSelectedVerse }) => {
  const number = Object.keys(verse)[0];
  const text = verse[number];
  return (
    <span
      onClick={() => {
        if (setSelectedVerse) setSelectedVerse(verse);
        document.getElementById(number)?.scrollIntoView({ behavior: "smooth" });
      }}
      id={number}
      className={classNames(isSelected ? "underline" : "", "scroll-m-10")}
    >
      <span className="text-xs px-1 align-text-top">{number}</span>
      <span>{text}</span>
    </span>
  );
};

export default Verse;
