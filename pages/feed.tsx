/* Friends / following notes viewing page */

import { useState } from "react";
import MenuBarTop from "@/components/MenuBarTop";
import { Page } from "@/utils/types";

export default function Notes() {
  const [posts, setPosts] = useState<any[]>([]); // TODO: figure out typing

  const getPosts = () => {
    // TODO: connect to backend
    return;
  };
  return (
    <div className="">
      <MenuBarTop currentPage={Page.FEED} />
      <div className="p-2 pb-20"></div>
    </div>
  );
}
