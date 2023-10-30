import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Register from "./components/authentication/Register.tsx";
import Navbar from "./components/layout/Navbar.tsx";
import Dictionary from "./components/dictionary/Dictionary.tsx";
import LogIn from "./components/authentication/LogIn.tsx";
import Exercises from "./components/practice/Exercises.tsx";
import FirstStep from "./components/practice/FirstStep.tsx";
import SecondStep from "./components/practice/SecondStep.tsx";
import ThirdStep from "./components/practice/ThirdStep.tsx";
import FourthStep from "./components/practice/FourthStep.tsx";
import AdminPage from "./components/admin/AdminPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <LogIn />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
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
  {
    path: "/practice",
    element: (
      <>
        <Navbar />
        <Exercises />
      </>
    ),
  },
  {
    path: "/practice/first-step",
    element: (
      <>
        <Navbar />
        <FirstStep />
      </>
    ),
  },
  {
    path: "/practice/second-step",
    element: (
      <>
        <Navbar />
        <SecondStep />
      </>
    ),
  },
  {
    path: "/practice/third-step",
    element: (
      <>
        <Navbar />
        <ThirdStep />
      </>
    ),
  },
  {
    path: "/practice/fourth-step",
    element: (
      <>
        <Navbar />
        <FourthStep />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
