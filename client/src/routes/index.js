import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardHOC from "../components/DashboardHOC";
import Login from "../pages/Login";
import Report from "../pages/Report";
import Settings from "../pages/Settings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardHOC />}>
          <Route index element={<Report />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
