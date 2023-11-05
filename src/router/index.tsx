import Login from "@/components/Login.tsx";
import { createBrowserRouter } from "react-router-dom";
import AuthRequired from "@/components/AuthRequired.tsx";
import UnAuthOnly from "@/components/UnAuthOnly.tsx";
import RootLayout from "@/components/RootLayout.tsx";
import Posts from "@/pages/Posts.tsx";
import Register from "@/components/Register.tsx";
import PostDetail from "@/pages/PostDetail.tsx";
import Search from "@/pages/Search.tsx";
import Profile from "@/pages/Profile.tsx";
import NotFound from "@/components/NotFound.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRequired>
        <RootLayout />
      </AuthRequired>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "post/:postId",
        element: <PostDetail />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "profile",
        element: <Profile />,
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
    path: "/register",
    element: (
      <UnAuthOnly>
        <Register />
      </UnAuthOnly>
    ),
  },
]);

export default routes;
