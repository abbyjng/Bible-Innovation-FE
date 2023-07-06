/* Friends / following notes viewing page */

import { useState } from "react";
import MenuBar from "@/components/MenuBar";
import { Page } from "@/utils/types";

export default function Notes() {
  const [posts, setPosts] = useState<any[]>([]); // TODO: figure out typing

  const getPosts = () => {
    // TODO: connect to backend
    return;
  };
  return (
    <div className="">
      <div className="p-2 pb-20"></div>
      <MenuBar currentPage={Page.FEED} />
    </div>
  );
}
