import Root from "./root";
import Register from "@/pages/Register";
import PrivateRoute from "@/components/PrivateRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import CompanyScreen from "@/pages/Company/Company";

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
      {
        path: "/companies",
        element: <CompanyScreen />,
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
