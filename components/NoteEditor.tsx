import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Page, VerseType } from "../utils/types";
import { classNames } from "@/utils/helper";
import { Editor } from "@tinymce/tinymce-react";
import Verse from "./Verse";

interface Props {
  verse: VerseType;
  content: string;
  onSave: (content: string) => void;
}

const NoteEditor: React.FC<Props> = ({ verse, content, onSave }) => {
  const editorRef = useRef<any>();

  return (
    <div className="w-screen h-screen flex flex-col justify-end bg-black/80 p-4 gap-4">
      <div className="bg-white rounded p-4">
        <Verse verse={verse} />
      </div>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content}
        init={{
          height: 500,
          menubar: "false",
          plugins: [
            // TODO: pick plugins https://www.tiny.cloud/docs/plugins/opensource/
          ],
          // TODO: pick formatting options https://www.tiny.cloud/docs/advanced/available-toolbar-buttons/
          toolbar:
            "formatselect | " +
            "bold italic backcolor " +
            "| bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        }}
      />
      <div
        className="w-full bg-gray-200 text-center rounded p-4 text-lg mb-4 cursor-pointer"
        onClick={() => onSave(editorRef.current.getContent())}
      >
        Save
      </div>
    </div>
  );
};

export default NoteEditor;
