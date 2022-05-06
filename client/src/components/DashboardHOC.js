import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet, useNavigate, Navigate } from "react-router";

const DashboardHOC = () => {
  const user = localStorage.getItem("i-access-id");

  if (!user) return <Navigate to={"/"} />;
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
