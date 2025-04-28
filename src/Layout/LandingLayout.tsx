import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import SearchResult from "../components/cart/SearchResult";
import React from "react";

export default function Layout() {
  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    setIsDashboard(location.pathname.startsWith("/dashboard"));
    setHideNavbar(location.pathname === "/student-profile");
  }, [location.pathname]);

  return (
    <>
      {isDashboard || hideNavbar ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <div>
          <Navbar />
          <SearchResult />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
}
