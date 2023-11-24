import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  useMediaQuery,
  Divider,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import {
  varFadeInUp,
  varWrapEnter,
  MotionInView,
} from "../../components/animate";
import { MHidden } from "../../components/@material-extend";
import backGroundIcon from "../../assets/icons/back-ground-landing.png";
import iconContact from "../../assets/icons/contact.png";
import iconHome from "../../assets/icons/home-white.png";
import iconPlayGame from "../../assets/icons/game.png";
import iconShop from "../../assets/icons/shop.png";
import iconMarket from "../../assets/icons/market.png";
import iconIdo from "../../assets/icons/ido.png";
import iconDollar from "../../assets/icons/dollar.png";
import MetaConnect from "./../../context/Provider";
import styled2 from "styled-components";
import { buyToken } from "./../../web3/ido.mjs";
import { getBalanceBUSD } from "./../../web3/ido.mjs";
import { getBalanceFIFA } from "./../../web3/shop.mjs";
import { PRICE_IDO } from "./../../const/const";
import { CountDown } from "./../../components/countDown/countdown";

const BtnBuy = styled2.div`
 &: hover {
  cursor: pointer;
 }
`;

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: "relative",
  background: `url(${backGroundIcon})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  [theme.breakpoints.up("md")]: {
    top: 0,
    left: 0,
    width: "100%",
    minHeight: "100%",
    display: "flex",
    // position: "fixed",
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    maxWidth: 380,
    margin: "auto",
    textAlign: "center",
    padding: theme.spacing(1, 1, 0),
    [theme.breakpoints.up("md")]: {
      boxShadow: "none",
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    "&.cardLeft": {
      [theme.breakpoints.up("md")]: { marginTop: -50 },
      backgroundColor: "rgba(9, 20, 48, 1)",
      maxWidth: 534,
    },
    "&.cardCenter": {
      [theme.breakpoints.up("md")]: {
        backgroundColor: "rgba(9, 20, 48, 1)",
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
      },
    },
  };
});

const CardInfoStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === "light"
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);
  return {
    minHeight: 450,
    margin: "auto",
    textAlign: "center",
    opacity: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      backgroundColor: "rgba(9, 20, 48, 1)",
      boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
    },
  };
});

const MenuItemIdoStyle = styled("div")(({ theme }) => ({
  display: "flex",
  borderRadius: "9px",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: 5,
  marginBottom: 10,
  background:
    "-webkit-linear-gradient(112deg, rgba(141, 198, 63, 1) 0%, rgba(57, 181, 74, 1) 100%)",
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

const MenuItemStyle = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: "#212B36",
  borderRadius: "9px",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: 5,
  marginBottom: 10,
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

const ButtonAction = styled(Box)(({ backGroundCus }) => ({
  display: "flex",
  borderRadius: "9px",
  width: "100%",
  height: "100%",
  direction: "row",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  marginTop: 10,
  marginBottom: 5,
  padding: 10,
  background: `${backGroundCus}`,
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

const SpaceBetweenContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
}));

const AmountTranferContainer = styled("div")(({ theme }) => ({
  display: "flex",
  direction: "column",
}));

const FormContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(3),
}));

export default function LayoutIdo() {
  const _meta = useContext(MetaConnect);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const [valAmount, setValAmount] = useState(1000);
  const [isBuying, setIsBuying] = useState(false);

  const handleChangeInput = (e) => {
    setValAmount(e.target.value);
  };

  const formatNumber = (_number) => {
    _number = _number.toString();
    if (_number.indexOf(".") > 0) {
      let _countNumberAfterDot = _number.Length - _number.IndexOf(".") - 1;
      let _remainNumber0 = 18 - _countNumberAfterDot;
      let _stringRemainNumber0 = "";

      for (let i = 0; i < _remainNumber0; i++) {
        _stringRemainNumber0 = _stringRemainNumber0 + "0";
      }

      return _number.replace(".", "") + _stringRemainNumber0;
    } else return _number + "000000000000000000";
  };

  const handleBuy = async () => {
    if (Number(valAmount) < 1000 || Number(valAmount) > 20000) {
      window.alert("Invalid Amount!");
      return;
    }

    try {
      setIsBuying(true);
      const txi = await buyToken(
        _meta.web3,
        _meta.address,
        formatNumber(valAmount)
      );
      setIsBuying(false);
      getBalanceBUSD(_meta.web3, _meta.address).then((e) => {
        _meta.setBalanceBUSD(Number(e) / Math.pow(10, 18));
      });
      getBalanceFIFA(_meta.web3, _meta.address).then((e) => {
        _meta.setBalanceFF(Number(e) / Math.pow(10, 18));
      });
    } catch (error) {
      console.log(error);
      setIsBuying(false);
    }
  };

  const renderBtnAction = (item) => {
    const { icon, title, backGroundBtn } = item || {};
    return (
      <BtnBuy
        style={{
          width: "100%",
          height: 48,
          marginBottom: theme.spacing(2),
          marginTop: theme.spacing(2),
        }}
      >
        <ButtonAction
          backGroundCus={backGroundBtn}
          onClick={(e) => handleBuy()}
        >
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <img
              src={icon}
              style={{ height: 16, width: 10, marginRight: 5 }}
              alt="null"
            />
            <Typography
              style={{
                width: "100%",
                fontFamily: "inherit",
                font: "normal normal bold 16px Poppins",
              }}
            >
              {isBuying ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span> Buying...</span>
                </>
              ) : (
                title
              )}
            </Typography>
          </Box>
        </ButtonAction>
      </BtnBuy>
    );
  };

  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <Container maxWidth="xl" sx={{ marginTop: 10 }}>
          <Grid container spacing={isDesktop ? 15 : 5}>
            <MHidden width="mdDown">
              <Grid key={"NFT-MenuItem"} item xs={12} md={3} mt={3}>
                <MotionInView variants={varFadeInUp}>
                  <CardStyle className={"cardCenter"}>
                    <MenuItemStyle onClick={() => navigate("/")}>
                      <img
                        src={iconHome}
                        style={{
                          width: 18,
                          height: 16,
                          marginRight: 10,
                          marginLeft: 10,
                        }}
                        alt="iconhome"
                      />
                      <Typography
                        style={{ font: "normal normal bold 18px Poppins" }}
                      >
                        {"HOME"}
                      </Typography>
                    </MenuItemStyle>
                    <MenuItemStyle>
                      <img
                        src={iconPlayGame}
                        style={{
                          width: 18,
                          height: 16,
                          marginRight: 10,
                          marginLeft: 10,
                        }}
                        alt="iconplaygame"
                      />
                      <Typography
                        style={{ font: "normal normal bold 18px Poppins" }}
                      >
                        {"PLAY GAME"}
                      </Typography>
                    </MenuItemStyle>
                    <MenuItemStyle>
                      <img
                        src={iconShop}
                        style={{
                          width: 18,
                          height: 16,
                          marginRight: 10,
                          marginLeft: 10,
                        }}
                        alt="iconshop"
                      />
                      <Typography
                        style={{ font: "normal normal bold 18px Poppins" }}
                      >
                        {"SHOP"}
                      </Typography>
                    </MenuItemStyle>
                    <MenuItemStyle>
                      <img
                        src={iconMarket}
                        style={{
                          width: 18,
                          height: 16,
                          marginRight: 10,
                          marginLeft: 10,
                        }}
                        alt="iconmarket"
                      />
                      <Typography
                        style={{ font: "normal normal bold 18px Poppins" }}
                      >
                        {"MARKETPLACE"}
                      </Typography>
                    </MenuItemStyle>
                    <MenuItemIdoStyle>
                      <img
                        src={iconIdo}
                        style={{
                          width: 18,
                          height: 16,
                          marginRight: 10,
                          marginLeft: 10,
                        }}
                        alt="iconido"
                      />
                      <Typography
                        style={{ font: "normal normal bold 18px Poppins" }}
                      >
                        {"IDO"}
                      </Typography>
                    </MenuItemIdoStyle>
                    <MenuItemStyle>
                      <a
                        href="https://docs.fifafootball.io"
                        style={{
                          textDecoration: "none",
                          color: "#ffffff",
                        }}
                        className="d-flex"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          src={iconContact}
                          style={{
                            width: 18,
                            height: 16,
                            marginRight: 10,
                            marginLeft: 10,
                          }}
                          className="my-auto"
                          alt="iconContact"
                        />
                        <Typography
                          style={{
                            font: "normal normal bold 18px Poppins",
                            textDecoration: "none !important",
                          }}
                        >
                          {"WHITEPP"}
                        </Typography>
                      </a>
                    </MenuItemStyle>
                  </CardStyle>
                </MotionInView>
              </Grid>
            </MHidden>

            <Grid key={"NFT-Info"} item xs={12} md={8} mt={3} style={{paddingBottom: 100}}>
              <CountDown />
              <MotionInView variants={varFadeInUp}>
                <CardInfoStyle>
                  <FormContainer>
                    <Typography
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        font: "normal normal bold 40px Poppins",
                      }}
                    >
                      {"PRIVATE SALE"}
                    </Typography>
                    <SpaceBetweenContainer>
                      <Typography
                        style={{
                          fontSize: 20,
                          width: "100%",
                          fontWeight: "bold",
                          color: "#86c540",
                          font: "normal normal bold 20px Poppins",
                          textAlign: "left",
                        }}
                      >
                        {`Total: ${_meta.balanceFF.toFixed(1)} FIFA`}
                      </Typography>
                      <Typography
                        style={{
                          width: "100%",
                          fontWeight: "bold",
                          font: "normal normal bold 20px Poppins",
                          color: "#86c540",
                          textAlign: "right",
                        }}
                      >
                        {`Balance: ${_meta.balanceBUSD.toFixed(1)} BUSD`}
                      </Typography>
                    </SpaceBetweenContainer>
                    <OutlinedInput
                      value={valAmount}
                      onChange={(e) => handleChangeInput(e)}
                      fullWidth
                      placeholder="Enter amount"
                      type="number"
                      style={{
                        marginTop: theme.spacing(3),
                        marginBottom: theme.spacing(3),
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <Typography
                            style={{
                              width: "100%",
                              fontWeight: "bold",
                              font: "normal normal bold 20px Poppins",
                              color: "#86c540",
                              textAlign: "right",
                            }}
                          >
                            {"BUSD"}
                          </Typography>
                        </InputAdornment>
                      }
                    />
                    <Divider />
                    <SpaceBetweenContainer>
                      <Typography
                        style={{
                          fontSize: 20,
                          width: "100%",
                          font: "normal normal 20px Poppins",
                          textAlign: "left",
                        }}
                      >
                        {"Private Sale"}
                      </Typography>
                      <Typography
                        style={{
                          width: "100%",
                          font: "normal normal 20px Poppins",
                          textAlign: "right",
                        }}
                      >
                        {`Min 1000$ - Max 20000$`}
                      </Typography>
                    </SpaceBetweenContainer>
                    <AmountTranferContainer>
                      <Typography
                        style={{
                          width: "100%",
                          font: "normal normal 20px Poppins",
                          textAlign: "right",
                        }}
                      >
                        {`1 FIFA ≈ ${PRICE_IDO}$`}
                      </Typography>
                    </AmountTranferContainer>
                    {renderBtnAction({
                      icon: iconDollar,
                      title: "BUY FIFA",
                      backGroundBtn:
                        "-webkit-linear-gradient(112deg, rgba(141, 198, 63, 1) 0%, rgba(57, 181, 74, 1) 100%)",
                    })}
                    <AmountTranferContainer>
                      <Typography
                        style={{
                          width: "100%",
                          font: "normal normal 20px Poppins",
                          textAlign: "left",
                        }}
                      >
                        {`Contract: 0xE1...eE4`}
                      </Typography>
                    </AmountTranferContainer>
                    <AmountTranferContainer>
                      <Typography
                        style={{
                          width: "100%",
                          font: "normal normal 20px Poppins",
                          textAlign: "left",
                        }}
                      >
                        {/* {`More: ****`} */}
                      </Typography>
                    </AmountTranferContainer>
                  </FormContainer>
                </CardInfoStyle>
              </MotionInView>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
      {/* <Box sx={{ height: { md: "100vh" } }} /> */}
      {/* <Box /> */}
    </>
  );
}
