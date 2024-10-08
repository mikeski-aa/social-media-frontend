import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { checkLoginStatus } from "./services/loginCalls";
import Friends from "./pages/Friends";
import ErrorPage from "./pages/ErrorPage";
import UserProfileForId from "./pages/UserProfileForId";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState();
  const [test, setTest] = useState("xd");
  const [err, setErr] = useState("false");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateLogin = async () => {
      const response = await checkLoginStatus();

      setIsLoading(false);
      // if user is no longer logged in or token is invalid, redirect back to login page!
      if (typeof response.validated === "undefined") {
        setErr(true);
        return;
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
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "profile/user/:id",
          element: <UserProfileForId />,
        },
        {
          path: "friends",
          element: <Friends />,
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
      <AuthContext.Provider value={{ user, setUser, err, setErr, isLoading }}>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
