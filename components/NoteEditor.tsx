import React, { useRef, useState } from "react";
import { NoteDataType, VerseType } from "../utils/types";
import { classNames } from "@/utils/helper";
import { Editor } from "@tinymce/tinymce-react";
import { textOptions } from "@/utils/constants";

interface Props {
  book: string;
  chapter: number;
  verse: number;
  content: string;
  height?: string;
  hideNoteEditor: () => void;
  handleSave: (
    book: string,
    chapter: number,
    verse: number,
    content: string
  ) => void;
}

const NoteEditor: React.FC<Props> = ({
  book,
  chapter,
  verse,
  content,
  height,
  hideNoteEditor,
  handleSave,
}) => {
  const editorRef = useRef<any>();

  const [saveDisabled, setSaveDisabled] = useState<boolean>(true);

  return (
    <div
      className={classNames(
        "flex flex-col justify-end bg-white px-4 py-2 gap-4 relative",
        height ? "" : "shadow"
      )}
    >
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        onInit={(_, editor) => (editorRef.current = editor)}
        onEditorChange={(value) => {
          setSaveDisabled(value === "");
        }}
        initialValue={content}
        init={{
          height: height ? height : "40vh",
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
            handleSave(book, chapter, verse, editorRef.current.getContent());
            hideNoteEditor();
          }
        }}
      >
        Save
      </div>
    </div>
  );
};

export default NoteEditor;
