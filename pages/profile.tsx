/* Profile page */

import { useState } from "react";
import MenuBarTop from "@/components/MenuBarTop";
import { Page } from "@/utils/types";

export default function Notes() {
  const [name, setName] = useState<any[]>([]); // TODO: figure out typing

  const getUser = () => {
    // TODO: connect to backend
    return;
  };

  return (
    <div className="">
      <MenuBarTop currentPage={Page.PROFILE} />
      <div className="p-2 pb-20">{name}</div>
    </div>
  );
}
