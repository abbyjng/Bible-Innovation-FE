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
      {/* this is going to be hardcoded for now as an example */}
      <div className="p-2 pb-20">
        {/* Post 1 */}
        <div className="ml-2 mr-2 mt-2">
          <img
            src="https://www.thesprucepets.com/thmb/uQnGtOt9VQiML2oG2YzAmPErrHo=/5441x0/filters:no_upscale():strip_icc()/all-about-tabby-cats-552489-hero-a23a9118af8c477b914a0a1570d4f787.jpg"
            alt="post"
          ></img>
          <div className="bg-slateGray">
            <div className="flex pt-[5px] pl-[5px]">
              <ProfileIcon className="fill-black" />
              <p className="ml-3 text-base font-sans">Noto Sans</p>
              <div className="flex pl-[165px]">
                <HeartIcon className="fill-black" />
                <CommentIcon className="fill-black" />
                <BookmarkIcon className="fill-black" />
              </div>
            </div>
            <div className="flex">
              <p className="ml-3">|</p>
              <p className="text-zinc-400 ml-2 text-base font-sans">
                View Thread
              </p>
            </div>
          </div>
        </div>

        {/* Post 2 */}
        <div>
          <div className="ml-2 mr-2 mt-2">
            <img
              src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjM2NTI5fQ"
              alt="post"
            ></img>
            <div className="bg-slateGray">
              <div className="flex pt-[5px] pl-[5px]">
                <ProfileIcon className="fill-black" />
                <p className="ml-3 text-base font-sans">Noto Sans</p>
                <div className="flex pl-[165px]">
                  <HeartIcon className="fill-black" />
                  <CommentIcon className="fill-black" />
                  <BookmarkIcon className="fill-black" />
                </div>
              </div>
              <div className="flex">
                <p className="ml-3">|</p>
                <p className="text-zinc-400 ml-2 text-base font-sans">
                  View Thread
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Post 3 */}
        <div>
          <div className="ml-2 mr-2 mt-2">
            <img
              src="https://www.science.org/do/10.1126/science.aba2340/abs/dogs_1280p_0.jpg"
              alt="post"
            ></img>
            <div className="bg-slateGray">
              <div className="flex pt-[5px] pl-[5px]">
                <ProfileIcon className="fill-black" />
                <p className="ml-3 text-base font-sans">Noto Sans</p>
                <div className="flex pl-[165px]">
                  <HeartIcon className="fill-black" />
                  <CommentIcon className="fill-black" />
                  <BookmarkIcon className="fill-black" />
                </div>
              </div>
              <div className="flex">
                <p className="ml-3">|</p>
                <p className="text-zinc-400 ml-2 text-base font-sans">
                  View Thread
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
