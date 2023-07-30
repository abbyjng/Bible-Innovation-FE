/* Friends / following notes viewing page */

import { useEffect, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { Page, PostType } from "@/utils/types";
import { useAuth } from "@/UserContext";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";
import ProfileIcon from "@/components/icons/ProfileIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import { getFollowedPosts } from "@/utils/orchestration";

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>();
  const { loading, isAuthenticated, user, logout, token } = useAuth();

  useEffect(() => {
    // checks if the user is authenticated
    if (!loading && !isAuthenticated) {
      localStorage.setItem("nextPage", "/feed");
      logout();
    }
  }, [isAuthenticated, loading, logout]);

  useEffect(() => {
    console.log("here");
    if (!posts && token) {
      console.log("now here");
      getFollowedPosts(token).then((posts) => {
        console.log(posts);
        if (posts) setPosts(posts);
      });
    }
  });

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <PageLayout menuBar={<MenuBar currentPage={Page.FEED} />}>
      <div className="p-2 pb-20 m-6 flex flex-col gap-6">
        {posts &&
          posts.map((post, index) => {
            return (
              <div className="border-2 border-slateGray" key={index}>
                <div className="p-4 h-full flex flex-col gap-2">
                  <span className="font-semibold">
                    {post.post.book} {post.post.chapter}:{post.post.verse}
                  </span>
                  <div
                    className="flex flex-col gap-2"
                    dangerouslySetInnerHTML={{ __html: post.post.note }}
                  />
                </div>
                <div className="bg-slateGray py-2 px-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      {post.photoURL ? (
                        <img
                          className="rounded-full w-5 h-5"
                          src={post.photoURL}
                          alt="profile photo"
                        />
                      ) : (
                        <ProfileIcon className="fill-white" />
                      )}
                      <p className="ml-3 text-base text-white">
                        {post.displayName}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <HeartIcon className="stroke-white w-6 h-6 mr-2" />
                      <CommentIcon className="stroke-white w-6 h-6 ml-2 mr-2" />
                      <BookmarkIcon className="stroke-white w-6 h-6 ml-2" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="border-l border-white mx-2 px-2">
                      <p className="text-white/60 text-base">View Thread</p>
                    </div>
                    <div className="text-white/60">
                      {new Date(post.post.created).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </PageLayout>
  );
}
