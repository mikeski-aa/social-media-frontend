import { Outlet } from "react-router";
import { AuthContext } from "../App";
import { useContext } from "react";

function Layout() {
  const authContext = useContext(AuthContext);
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
      <Outlet />
    </div>
  );
}

export default Layout;
