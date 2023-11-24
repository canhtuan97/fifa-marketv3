import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/main";
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { element: <MarketPage /> },
        { path: "shop", element: <ShopPage /> },
        { path: "list-games", element: <PlayGames /> },
        { path: "bridge", element: <BridgePage /> },
        // { path: 'market', element: <MarketPage /> },
        { path: "mynft", element: <MyNftPage /> },
        { path: "nfts", element: <NftsPage /> },
        { path: "404", element: <NotFound /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
// const IdoPage = Loadable(lazy(() => import('../pages/ido')));
const ShopPage = Loadable(lazy(() => import("../pages/shop")));
const PlayGames = Loadable(lazy(() => import("../pages/playGames")));
const BridgePage = Loadable(lazy(() => import("../pages/bridge")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
const MarketPage = Loadable(lazy(() => import("../pages/market")));
const MyNftPage = Loadable(lazy(() => import("../pages/my-nft")));
const NftsPage = Loadable(lazy(() => import("../pages/nfts")));
