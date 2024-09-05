import { Outlet } from "react-router";
import { AuthContext } from "../App";
import { useContext } from "react";
import Nav from "./Nav";

function Layout() {
  const authContext = useContext(AuthContext);

  // need to add proper loading componenet
  // not sure if this is the best way to do it
  if (authContext.isLoading) {
    return (
      <>
        <h1>LOADING...</h1>
      </>
    );
  }

  return (
    <div className="layoutDiv">
      <h3>Layout div</h3>
      <Nav />
      <Outlet />
    </div>
  );
}

export default Layout;
