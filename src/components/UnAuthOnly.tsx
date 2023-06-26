import { ReactNode } from "react";
import useUserStore from "@/store/user-store.ts";
import { Navigate } from "react-router-dom";

const UnAuthOnly = ({ children }: { children: ReactNode }) => {
  const token = useUserStore((state) => state.token);
  if (token) {
    return <Navigate to={"/"} />;
  }
  return <>{children}</>;
};

export default UnAuthOnly;
