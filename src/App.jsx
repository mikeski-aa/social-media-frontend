import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import checkLoginStatus from "./services/checkLoginStatus";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [test, setTest] = useState("xd");

  useEffect(() => {
    const validateLogin = async () => {
      const response = await checkLoginStatus();
      console.log(response);

      // if user is no longer logged in or token is invalid, redirect back to login page!
      if (typeof response.validated === "undefined") {
        console.log("no user logged in found, redirect");
      } else {
        setUser(response);
      }
    };

    validateLogin();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <AuthContext.Provider value={{ test, setTest }}>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
