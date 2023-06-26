import Login from "@/components/Login.tsx";
import { createBrowserRouter } from "react-router-dom";
import AuthRequired from "@/components/AuthRequired.tsx";
import UnAuthOnly from "@/components/UnAuthOnly.tsx";
import NotFound from "@/components/NotFound.tsx";
import RootLayout from "@/components/RootLayout.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRequired>
        <RootLayout />
      </AuthRequired>
    ),
    children: [
      {
        path: "",
        element: <div>Home</div>,
      },
      {
        path: "search",
        element: <div>Search</div>,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UnAuthOnly>
        <Login />
      </UnAuthOnly>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
