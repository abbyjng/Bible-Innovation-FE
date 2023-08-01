/* Friends / following notes viewing page */

import { useEffect, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { OtherUserType, Page, PostType } from "@/utils/types";
import { useAuth } from "@/UserContext";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";
import ProfileIcon from "@/components/icons/ProfileIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import BookmarkIcon from "@/components/icons/BookmarkIcon";
import CommentIcon from "@/components/icons/CommentIcon";
import { getFeed, getUser, searchFriends } from "@/utils/orchestration";
import SearchIcon from "@/components/icons/SearchIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import LoadingIcon from "@/components/icons/LoadingIcon";

export default function Feed() {
  const [posts, setPosts] = useState<PostType[]>();
  const [searchPageOpen, setSearchPageOpen] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<string>("");
  const [results, setResults] =
    useState<{ item: OtherUserType; refIndex: number }[]>();
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);

  const {
    loading,
    isAuthenticated,
    user,
    logout,
    token,
    followUser,
    unfollowUser,
  } = useAuth();

  useEffect(() => {
    if (searchVal !== "") {
      const timeoutId = setTimeout(async () => {
        setLoadingSearch(true);
        setResults(undefined);
        const searchResult = await searchFriends(searchVal);
        setResults(searchResult);
        setLoadingSearch(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [searchVal]);

  useEffect(() => {
    // checks if the user is authenticated
    if (!loading && !isAuthenticated) {
      localStorage.setItem("nextPage", "/feed");
      logout();
    }
  }, [isAuthenticated, loading, logout]);

  useEffect(() => {
    if (!posts && token) {
      getFeed(token).then((posts) => {
        if (posts) {
          getUsers(posts.content).then((newPosts) => {
            if (newPosts) setPosts(newPosts);
          });
        }
      });
    }
  }, [posts, token, user?.friends]);

  const getUsers = async (posts: PostType[]) => {
    let newPosts: PostType[] = [];
    await posts.reduce(async (users: any, post) => {
      const currUsers = await users;

      if (post.uid in currUsers) {
        newPosts.push({
          ...post,
          displayName: currUsers[post.uid].displayName
            ? currUsers[post.uid].displayName
            : undefined,
          photoURL: currUsers[post.uid].photoURL
            ? currUsers[post.uid].photoURL
            : undefined,
        });
        return currUsers;
      } else {
        const user = await getUser(post.uid);

        if (user)
          newPosts.push({
            ...post,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        else
          newPosts.push({
            ...post,
          });
        currUsers[post.uid] = user;
        return currUsers;
      }
    }, {});

    return newPosts;
  };

  if (loading || !user || !token) {
    return <Loader />;
  }

  return (
    <PageLayout menuBar={<MenuBar currentPage={Page.FEED} />}>
      <div className="p-2 pb-20 m-6">
        {searchPageOpen && (
          <div className=" mt-10">
            <div onClick={() => setSearchPageOpen(false)}>
              <CloseIcon className="w-6 h-6 absolute top-6 right-6 cursor-pointer fill-black" />
            </div>
            <div className="relative">
              <input
                className="bg-gray-100 py-2 pr-4 pl-9 w-full rounded border border-black"
                placeholder="Find friends"
                type="text"
                autoFocus
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
              />
              <SearchIcon className="w-5 h-5 absolute top-2.5 left-2" />
            </div>
            {loadingSearch ? (
              <div className="h-[200px] w-full flex items-center justify-center">
                <div className="animate-spin h-24 w-24">
                  <LoadingIcon />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mt-4">
                {results?.map((result, index) => {
                  if (result.item.uid === user.uid) {
                    return;
                  }
                  return (
                    <div
                      key={index}
                      className="bg-gray-200 w-full px-4 py-2 flex justify-between gap-4 items-center"
                    >
                      <div className="flex gap-2 items-center">
                        {result.item.photoURL ? (
                          <img
                            className="rounded-full w-5 h-5"
                            src={result.item.photoURL}
                            alt="profile photo"
                          />
                        ) : (
                          <ProfileIcon className="fill-black" />
                        )}
                        {result.item.displayName
                          ? result.item.displayName
                          : result.item.email}
                      </div>

                      {user.friends &&
                      user.friends.includes(result.item.uid) ? (
                        <div
                          className="text-slateGray underline cursor-pointer"
                          onClick={() => unfollowUser(result.item.uid)}
                        >
                          Unfollow
                        </div>
                      ) : (
                        <div
                          className="text-slateGray underline cursor-pointer"
                          onClick={() => followUser(result.item.uid)}
                        >
                          Follow
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {!searchPageOpen && (
          <div className="flex flex-col gap-6 mt-8">
            <div onClick={() => setSearchPageOpen(true)}>
              <SearchIcon className="w-5 h-5 absolute top-6 right-6 cursor-pointer" />
            </div>
            {posts &&
              posts.map((post, index) => {
                return (
                  <div className="border-2 border-slateGray" key={index}>
                    <div className="p-4 h-full flex flex-col gap-2">
                      <span className="font-semibold">
                        {post.book} {post.chapter}:{post.verse}
                      </span>
                      <div
                        className="flex flex-col gap-2"
                        dangerouslySetInnerHTML={{ __html: post.note }}
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
                          {new Date(post.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
