/* Friends / following notes viewing page */

import { useEffect, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { Page } from "@/utils/types";
import { useAuth } from "@/UserContext";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";
import ProfileIcon from "@/components/icons/ProfileIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import CommentIcon from "@/components/icons/CommentIcon";

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([]); // TODO: figure out typing
  const { loading, isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    // checks if the user is authenticated
    if (!loading && !isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, loading, logout]);

  if (loading || !user) {
    return <Loader />;
  }

  const getPosts = () => {
    // TODO: connect to backend
    return;
  };

  return (
    <PageLayout menuBar={<MenuBar currentPage={Page.FEED} />}>
      <div className="p-2 pb-20">
        {/* this is going to be hardcoded for now as an example */}
        <div className="ml-2 mr-2">
          <img
            src="https://www.thesprucepets.com/thmb/uQnGtOt9VQiML2oG2YzAmPErrHo=/5441x0/filters:no_upscale():strip_icc()/all-about-tabby-cats-552489-hero-a23a9118af8c477b914a0a1570d4f787.jpg"
            alt="post"
          ></img>
          <div className="bg-gray-200">
            <div className="flex pt-[5px]">
              <ProfileIcon className="fill-black" />
              <p className="ml-3">username</p>
              <div className="flex">
                <HeartIcon className="fill-black" />
                <CommentIcon className="fill-black" />
                <BookmarkIcon className="fill-black" />
              </div>
            </div>
            <div className="flex">
              <p>|</p>
              <p className="text-zinc-400">View Thread</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
