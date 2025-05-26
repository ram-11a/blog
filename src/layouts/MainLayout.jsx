// used to apply a layout on all pages
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  //Here we are making navbar to show always in all pages
  return (
    <div className="px-4 md:px-8 lg:px-16v xl:px-32 2xl:px-64">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
