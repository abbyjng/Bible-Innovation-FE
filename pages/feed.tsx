/* Friends / following notes viewing page */

import { useEffect, useState } from "react";
import MenuBar from "@/components/MenuBar";
import { Page } from "@/utils/types";
import { useAuth } from "@/UserContext";
import Loader from "@/components/Loader";
import PageLayout from "@/components/PageLayout";

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
      <div className="p-2 pb-20"></div>
    </PageLayout>
  );
}
