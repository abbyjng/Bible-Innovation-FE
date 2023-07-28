import React, { useRef, useState } from "react";
import { NoteDataType, VerseType } from "../utils/types";
import { classNames } from "@/utils/helper";
import { Editor } from "@tinymce/tinymce-react";
import { textOptions } from "@/utils/constants";

interface Props {
  book: string;
  chapter: number;
  verse: VerseType;
  content: string;
  hideNoteEditor: () => void;
}

const NoteEditor: React.FC<Props> = ({
  book,
  chapter,
  verse,
  content,
  hideNoteEditor,
}) => {
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
    hideNoteEditor();
  };

  return (
    <div className="flex flex-col justify-end bg-white px-4 py-2 gap-4 shadow relative">
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
          toolbar: "bold italic backcolor alignleft alignright | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
          skin_url: "/tinymceSkin",
          statusbar: false,
          color_map: textOptions,
          custom_colors: false,
          color_cols: 7,
        }}
      />
      <div
        className={classNames(
          "w-full text-center rounded p-4 text-lg mb-4",
          saveDisabled
            ? "text-gray-300 bg-slateGray/80"
            : "cursor-pointer text-white bg-slateGray"
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
