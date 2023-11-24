import { useLocation, Outlet } from "react-router-dom";
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = false;

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>
      {!isHome ? <MainFooter /> : null}
    </>
  );
}
