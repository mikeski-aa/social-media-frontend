import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="layoutDiv">
      <h3>Layout div</h3>
      <Outlet />
    </div>
  );
}

export default Layout;
