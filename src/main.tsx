import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import App from "./App.tsx";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";

import Register from "./components/authentication/Register.tsx";
import SignIn from "./components/authentication/SignIn.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import Dictionary from "./components/dictionary/Dictionart.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dictionary",
    element: (
      <>
        <Navbar />
        <Dictionary />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
