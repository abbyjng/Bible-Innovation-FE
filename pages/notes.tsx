/* Personal notes viewing and editing page */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import MenuBar from "@/components/MenuBar";
import { Page } from "@/utils/types";
import { Editor } from "@tinymce/tinymce-react";

export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]); // TODO: figure out typing

  const getNotes = () => {
    // TODO: connect to backend
    return;
  };

  return (
    <div>
      <div className="p-2 pb-20"></div>
      <MenuBar currentPage={Page.NOTES} />
    </div>
  );
}
