/* Profile page */

import { useEffect, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { Page } from "@/utils/types";
import Link from "next/link";
import { useAuth } from "@/UserContext";
import Image from "next/image";
import DefaultImg from "../assets/default.png";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";
import { classNames, isNextDay } from "@/utils/helper";

export default function Profile() {
  const { loading, isAuthenticated, user, logout, streak, roots, updateRoots } =
    useAuth();

  useEffect(() => {
    // checks if the user is authenticated
    if (!loading && !isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, loading, logout]);

  useEffect(() => {
    if (roots && !loading) {
      const status = isNextDay(roots.lastIncrement);
      if ((status === 1 || status === 0) && roots.count >= 7) {
        updateRoots(0, 0);
      }
    }
  });

  if (loading || !user || !roots) {
    return <Loader />;
  }

  return (
    <PageLayout menuBar={<MenuBar currentPage={Page.PROFILE} />}>
      <div className="p-2 pb-20">
        {/* Profile Picture and Username */}
        <div className="text-center">
          {user.photoURL ? (
            <Image
              className="mx-auto w-[100px] h-[100px] mt-2"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvCW6gQaavw2toeF-2b5V6YCFvq4Kpip5ivQ&usqp=CAU"
              alt="profile picture"
            />
          ) : (
            <Image
              className="mx-auto w-[100px] h-[100px] mt-2"
              src={DefaultImg}
              alt="profile picture"
            />
          )}
          <p className="font-bold font-sans">{user.displayName}</p>
        </div>

        {/* User Statistics */}
        <div className="text-center flex justify-between m-4 font-sans">
          <div>
            <p className="font-bold">{streak?.count}</p>
            <p>Streak</p>
          </div>
          <div>
            <p className="font-bold">0</p>
            <p>Posts</p>
          </div>
          <div>
            <p className="font-bold">0</p>
            <p>Friends</p>
          </div>
        </div>

        {/* Habit Building */}
        <div>
          <p className="font-bold text-center font-sans">
            growing roots sessions
          </p>
          <div className="flex justify-center w-full">
            <div className="flex justify-center items-center max-w-[350px] w-full">
              {Array.apply(null, Array(7)).map((_, index) => {
                return (
                  <>
                    {index !== 0 && (
                      <div
                        className={classNames(
                          "h-1 w-full",
                          index < roots?.count ? "bg-[#74C95F]" : "bg-gray-200"
                        )}
                      />
                    )}
                    <div
                      key={index}
                      className={classNames(
                        "rounded-full h-5 w-5 shrink-0",
                        index < roots?.count ? "bg-[#74C95F]" : "bg-gray-200"
                      )}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievement Button */}
        <div className="bg-gray-200 ml-4 mr-4 mt-4 mb-4 text-center font-sans">
          <button>
            <p className="mt-2 mb-2">Achievements</p>
          </button>
        </div>

        {/* User Posts */}
        <div className="text-center">
          <p className="font-bold mt-8 mb-8 font-sans">Posts</p>
          <div className="flex mb-8 w-[200px] h-[200px]">
            <img
              src="https://www.thesprucepets.com/thmb/uQnGtOt9VQiML2oG2YzAmPErrHo=/5441x0/filters:no_upscale():strip_icc()/all-about-tabby-cats-552489-hero-a23a9118af8c477b914a0a1570d4f787.jpg"
              alt="post"
            ></img>
          </div>
        </div>

        {/* Sign out button */}
        <div className="text-center text-blue-600 mb-2 font-sans underline">
          <Link href="/signout">
            <p>Sign Out</p>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
