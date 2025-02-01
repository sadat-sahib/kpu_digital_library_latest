import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import SearchResult from "../components/cart/SearchResult";

export default function Layout() {
  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    setIsDashboard(location.pathname.startsWith('/dashboard'));
  }, [location.pathname]);

  return (
    <>
      {isDashboard ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <div>
          <Navbar />
          <SearchResult/>
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
}
