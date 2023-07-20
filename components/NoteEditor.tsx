import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { NoteDataType, Page, VerseType } from "../utils/types";
import { classNames } from "@/utils/helper";
import { Editor } from "@tinymce/tinymce-react";
import Verse from "./Verse";

interface Props {
  book: string;
  chapter: number;
  verse: VerseType;
  content: string;
  onSave: (content: NoteDataType) => void;
}

const NoteEditor: React.FC<Props> = ({
  book,
  chapter,
  verse,
  content,
  onSave,
}) => {
  const overallRef = useRef<any>();
  const editorRef = useRef<any>();

  const [saveDisabled, setSaveDisabled] = useState<boolean>(true);

  const saveData = (content: string) => {
    const noteData: NoteDataType = {
      book: book,
      chapter: chapter,
      verse: Object.keys(verse)[0] as unknown as number,
      note: content,
    };
    const jsonData = JSON.stringify(noteData, null, 2);
    localStorage.setItem("noteSaveData", jsonData);
    onSave(noteData);
  };

  return (
    <div className="flex flex-col justify-end bg-white px-4 py-2 gap-4">
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        onInit={(_, editor) => (editorRef.current = editor)}
        onEditorChange={(value) => {
          setSaveDisabled(value === "");
        }}
        initialValue={content}
        init={{
          height: "40vh",
          menubar: "false",
          plugins: "formatpainter",
          toolbar:
            "bold italic backcolor formatpainter alignleft alignright | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
          skin_url: "/tinymceSkin",
          statusbar: false,
          color_map: [
            "#ff6b6b",
            "Light Red",
            "#ffb46f",
            "Sandy Brown",
            "#ffe894",
            "Jasmine",
            "#b0f5b3",
            "Celadon",
            "#86f7f5",
            "Ice Blue",
            "#dcaff8",
            "Mauve",
          ],
          custom_colors: false,
          color_cols: 7,
        }}
      />
      <div
        className={classNames(
          "w-full bg-gray-200 text-center rounded p-4 text-lg mb-4 bg-gray-200",
          saveDisabled ? "text-gray-400" : "cursor-pointer"
        )}
        onClick={() => {
          if (!saveDisabled) {
            saveData(editorRef.current.getContent());
          }
        }}
      >
        Save
      </div>
    </div>
  );
};

export default NoteEditor;
