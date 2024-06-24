import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./main.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import router from "./router/router.tsx";

import store from "./store/index.ts";
import { UserCookiesProvider } from "./context/UserCookiesContext.tsx";
import { useAxiosConfig } from "./api/axiosConfig.ts";


export const Main = () => {
  useAxiosConfig();

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserCookiesProvider>
      <Main />
    </UserCookiesProvider>
  </React.StrictMode>
);
