/* Friends / following notes viewing page */

import { useState } from "react";
import MenuBar from "@/components/MenuBar";
import { Page } from "@/utils/types";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]); // TODO: figure out typing

  const getPosts = () => {
    // TODO: connect to backend
    return;
  };
  return (
    <div className="">
      <MenuBar currentPage={Page.FEED} />
      <div className="p-2 pb-20"></div>
    </div>
  );
}
