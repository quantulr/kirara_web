import useUserStore from "@/store/user-store.ts";

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AuthRequired = ({ children }: { children: ReactNode }) => {
  const token = useUserStore((state) => state.token);

  // If there is no token, redirect to the login page.
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  // Otherwise, render the children.
  return <>{children}</>;
};

export default AuthRequired;
