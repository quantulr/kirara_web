import Login from "@/components/Login.tsx";
import { createBrowserRouter } from "react-router-dom";
import AuthRequired from "@/components/AuthRequired.tsx";
import UnAuthOnly from "@/components/UnAuthOnly.tsx";
import NotFound from "@/components/NotFound.tsx";
import RootLayout from "@/components/RootLayout.tsx";
import Gallery from "@/components/Gallery.tsx";
import Test from "@/components/Test.tsx";

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
        element: (
          <div>
            <p>home</p>
          </div>
        ),
      },
      {
        path: "search",
        element: <div>Search</div>,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "gallery",
        element: <Gallery />,
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
