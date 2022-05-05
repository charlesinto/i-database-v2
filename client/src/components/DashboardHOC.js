import Footer from "./Footer";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { Outlet } from "react-router";

const DashboardHOC = () => {
  return (
    <>
      <NavBar />
      <div className="container app-wrapper">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardHOC;
