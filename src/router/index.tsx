import Login from "@/components/Login.tsx";
import { createBrowserRouter } from "react-router-dom";
import AuthRequired from "@/components/AuthRequired.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRequired>
        <h1>home</h1>
      </AuthRequired>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
