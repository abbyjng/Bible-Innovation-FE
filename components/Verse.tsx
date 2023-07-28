import React, { useEffect, useState } from "react";
import { VerseType } from "../utils/types";
import { classNames } from "@/utils/helper";
import VerseNoteIcon from "./icons/VerseNoteIcon";

interface Props {
  verse: VerseType;
  isSelected: boolean;
  setSelectedVerse?: (verse: VerseType) => void;
  highlight?: string;
  routerVerse: boolean;
  hasNote: boolean;
}

const Verse: React.FC<Props> = ({
  verse,
  isSelected,
  setSelectedVerse,
  highlight,
  routerVerse,
  hasNote,
}) => {
  const number = Object.keys(verse)[0];
  const text = verse[number];

  const [hasScrolled, setHasScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (routerVerse) {
      document.getElementById(number)?.scrollIntoView({ behavior: "smooth" });
      setHasScrolled(true);
    }
  }, [number, routerVerse]);

  return (
    <span
      onClick={() => {
        if (setSelectedVerse) setSelectedVerse(verse);
        document.getElementById(number)?.scrollIntoView({ behavior: "smooth" });
      }}
      id={number}
      className={classNames(
        "scroll-m-10 cursor-pointer",
        isSelected ? "underline" : "",
        highlight
          ? highlight
          : "transition-[background-color] delay-[1000ms] duration-300",
        !hasScrolled && routerVerse
          ? "bg-[#c4ecff]"
          : highlight && highlight !== ""
          ? highlight
          : "bg-[#c4ecff]/0"
      )}
    >
      {hasNote && <VerseNoteIcon className="fill-[#208906] inline" />}
      <span className="text-xs px-1 align-text-top">{number}</span>
      <span>{text}</span>
    </span>
  );
};

export default Verse;
