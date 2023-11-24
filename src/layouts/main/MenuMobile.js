import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { List, Link, Drawer, Typography } from "@mui/material";
import Logo from "../../components/Logo";
import Scrollbar from "../../components/Scrollbar";
import { MIconButton } from "../../components/@material-extend";
import iconContact from "../../assets/icons/contact.png";
import iconHome from "../../assets/icons/home-white.png";
import iconPlayGame from "../../assets/icons/game.png";
import iconShop from "../../assets/icons/shop.png";
import iconMarket from "../../assets/icons/market.png";
import iconIdo from "../../assets/icons/ido.png";
import iconMyNFTS from "../../assets/icons/my-nfts.png";
import iconCommission from "../../assets/icons/icon-commission.png";
import iconBridge from "../../assets/bridge/bridge_icon.png";

const PADDING = 2.5;

const MenuItemContainer = styled("div")(({ isFocus }) => ({
  display: "flex",
  backgroundColor: isFocus ? "" : "#212B36",
  borderRadius: "9px",
  background: isFocus
    ? "-webkit-linear-gradient(112deg, rgba(141, 198, 63, 1) 0%, rgba(57, 181, 74, 1) 100%)"
    : "",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: 5,
  marginBottom: 10,
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

const menuPage = [
  {
    title: "HOME",
    pathName: "/no-path",
    icon: iconHome,
    url: "https://fifafootball.io",
  },
  {
    title: "PLAY GAME",
    pathName: "/list-games",
    icon: iconPlayGame,
    url: "https://farm.fifafootball.io/play",
  },
  {
    title: "SHOP",
    pathName: "/shop",
    icon: iconShop,
    url: "https://marketplace.fifafootball.io/shop",
  },
  {
    title: "MARKETPLACE",
    pathName: "/",
    icon: iconMarket,
    url: "https://marketplace.fifafootball.io",
  },
  {
    title: "IDO",
    pathName: "/ido",
    icon: iconIdo,
    url: "https://ido.fifafootball.io",
  },
  {
    title: "MY NFTS",
    pathName: "/mynft",
    icon: iconMyNFTS,
    url: "https://marketplace.fifafootball.io/mynft",
  },
  {
    title: "WHITEPAPER",
    pathName: "/intro",
    icon: iconContact,
    url: "https://docs.fifafootball.io/",
  },
  {
    title: "COMMISSION",
    pathName: "/commission",
    icon: iconCommission,
    url: "https://commission.fifafootball.io",
  },
  {
    title: "BRIDGE",
    pathName: "/bridge",
    icon: iconBridge,
    url: "https://marketplace.fifafootball.io/bridge",
  },
];

MenuMobile.propTypes = {
  isOffset: PropTypes.bool,
  isHome: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function MenuMobile({ isOffset, isHome, navConfig }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
  }, [pathname]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <MIconButton
        onClick={handleDrawerOpen}
        sx={{
          ml: 1,
          ...(isHome && { color: "common.white" }),
          ...(isOffset && { color: "text.primary" }),
        }}
      >
        <Icon icon={menu2Fill} color="rgba(57, 181, 74, 1)" />
      </MIconButton>

      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: 260 } }}
      >
        <Scrollbar>
          <Link component={RouterLink} to="/" sx={{ display: "inline-flex" }}>
            <Logo sx={{ mx: PADDING, my: 3 }} />
          </Link>

          <List sx={{ padding: 2 }}>
            {menuPage.map(({ title, icon, pathName, url }) => {
              return (
                <MenuItemContainer
                  key={`menu-item-${pathName}`}
                  isFocus={pathName === pathname}
                  onClick={() => {
                    if (
                      [
                        "/shop",
                        "/mynft",
                        "/bridge",
                        "/",
                        "/list-games",
                      ].includes(pathName)
                    ) {
                      navigate(pathName);
                    } else {
                      return;
                    }
                  }}
                >
                  {!["/shop", "/mynft", "/bridge", "/", "/list-games"].includes(
                    pathName
                  ) ? (
                    <a
                      href={url}
                      style={{
                        textDecoration: "none",
                        color: "#ffffff",
                      }}
                      className="d-flex"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={icon}
                        style={{
                          width: 14,
                          height: 12,
                          marginRight: 10,
                          marginLeft: 10,
                        }}
                        className="my-auto"
                        alt="iconContact"
                      />

                      <Typography
                        style={{ font: "normal normal bold 14px Poppins" }}
                      >
                        {title}
                      </Typography>
                    </a>
                  ) : (
                    <>
                      <img
                        src={icon}
                        style={{
                          width: 14,
                          height: 12,
                          marginRight: 10,
                          marginLeft: 10,
                        }}
                        alt=""
                      />

                      <Typography
                        style={{ font: "normal normal bold 14px Poppins" }}
                      >
                        {title}
                      </Typography>
                    </>
                  )}
                </MenuItemContainer>
              );
            })}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}
