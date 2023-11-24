import { useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Button, AppBar, Toolbar, Container } from "@mui/material";
import useOffSetTop from "../../hooks/useOffSetTop";
import Logo from "../../components/Logo";
import { MHidden } from "../../components/@material-extend";
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./MenuConfig";
import metaStorage from "./../../context/Provider";
import { getBalance, getChainId, initWeb3 } from "./../../web3/login.mjs";
import { getBalanceFIFA } from "./../../web3/shop.mjs";
import { hexToNumber } from "./../../web3/utils.mjs";
import { CHAIN_ID } from "./../../const/const";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const _meta = useContext(metaStorage);
  const isOffset = useOffSetTop(100);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const connectMeta = () => {
    if (typeof window.ethereum === "undefined") {
      window.alert("MetaMask isnot installed!");
      return;
    }

    if (_meta.isConnected) return;

    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((e) => {
        _meta.setIsConnected(true);
        _meta.setAddress(e[0]);
        getChainId(initWeb3(window)).then((_chainId) => {
          _meta.setChainId(hexToNumber(_chainId));
          if (hexToNumber(_chainId) === CHAIN_ID) {
            getBalance(initWeb3(window), e[0]).then((_balance) =>
              _meta.setBalance(Number(_balance) / Math.pow(10, 18))
            );
            getBalanceFIFA(initWeb3(window), e[0]).then((_balance) =>
              _meta.setBalanceFF(Number(_balance) / Math.pow(10, 18))
            );
          }
        });
      })
      .catch((e) => {
        console.log("login fail");
      });
  };

  const formatAddress = (_address) => {
    return (
      _address.slice(0, 4) +
      `...` +
      _address.slice(_address.length - 4, _address.length)
    );
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: "transparent" }}>
      <ToolbarStyle
        disableGutters
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.16)",
          height: { md: APP_BAR_DESKTOP - 16 },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
          <MHidden width="mdDown">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </MHidden>
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
          <MHidden width="mdDown">
            <Button
              onClick={() => connectMeta()}
              variant="contained"
              style={{
                font: "normal normal bold 14px Poppins",
                background:
                  "-webkit-linear-gradient(112deg, rgba(141, 198, 63, 1) 0%, rgba(57, 181, 74, 1) 100%)",
              }}
            >
              {_meta.isConnected ? (
                _meta.chainId !== CHAIN_ID ? (
                  <span className="text-warning">Wrong Network!</span>
                ) : (
                  formatAddress(_meta.address)
                )
              ) : (
                `CONNECT WALLET`
              )}
            </Button>
          </MHidden>
          <MHidden width="mdUp">
            <Button
              onClick={() => connectMeta()}
              variant="contained"
              style={{
                font: "normal normal bold 10px Poppins",
                background:
                  "-webkit-linear-gradient(112deg, rgba(141, 198, 63, 1) 0%, rgba(57, 181, 74, 1) 100%)",
              }}
            >
              {_meta.isConnected ? (
                _meta.chainId !== CHAIN_ID ? (
                  <span className="text-warning">Wrong Network!</span>
                ) : (
                  formatAddress(_meta.address)
                )
              ) : (
                `CONNECT WALLET`
              )}
            </Button>
          </MHidden>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
