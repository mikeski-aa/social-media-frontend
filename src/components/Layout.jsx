import { Outlet } from "react-router";
import { AuthContext } from "../App";
import { useContext } from "react";
import Nav from "./Nav";
import "../styles/layout.css";
import useRedirectValidFail from "../hooks/useRedirectValidFail";

function Layout() {
  const authContext = useContext(AuthContext);

  useRedirectValidFail(authContext.err);

  // need to add proper loading componenet
  // not sure if this is the best way to do it
  if (authContext.isLoading) {
    return (
      <div className="loadingMainPage">
        <h1>LOADING...</h1>
        <h3>Please be patient, our servers are waking up!</h3>
      </div>
    );
  }

  return (
    <div className="layoutDiv">
      <Nav />
      <Outlet />
    </div>
  );
}

export default Layout;
