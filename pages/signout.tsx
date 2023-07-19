/* Sign out page */

import { useAuth } from "@/auth_context";
import Loader from "@/components/Loader";
import { useEffect } from "react";

export default function SignOut() {
  const { loading, isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    if (!loading) {
      logout();
    }
  }, [loading, logout]);

  if (loading || !user) {
    return <Loader />;
  }
}
