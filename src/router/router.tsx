import Root from "./root";
import Register from "@/pages/Register";
import { Home, Login } from "@mui/icons-material";
import PrivateRoute from "@/components/PrivateRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
