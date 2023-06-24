import Login from "@/components/Login.tsx";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <h1>home</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
