/* Profile page */

import { useState } from "react";
import MenuBar from "@/components/MenuBar";
import { Page } from "@/utils/types";

export default function Notes() {
  const [name, setName] = useState<any[]>([]); // TODO: figure out typing

  const getUser = () => {
    // TODO: connect to backend
    return;
  };

  return (
    <div className="">
      <div className="p-2 pb-20">{name}</div>
      <MenuBar currentPage={Page.PROFILE} />
    </div>
  );
}
