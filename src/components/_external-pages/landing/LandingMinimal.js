// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Roadmap } from "./roadmap";
import { Team } from "./team";

//
import { varFadeInUp, MotionInView, varFadeInDown } from "../../animate";
import iconFC from "../../../assets/icons/FC.png";
import iconOptionPlay1 from "../../../assets/icons/option-play-1.png";
import iconOptionPlay2 from "../../../assets/icons/option-play-2.png";
import iconOptionPlay3 from "../../../assets/icons/option-play-3.png";
import iconOptionPlay4 from "../../../assets/icons/option-play-4.png";
import iconOptionPlay5 from "../../../assets/icons/option-play-5.png";
import iconOptionPlay6 from "../../../assets/icons/option-play-6.png";
import iconOptionPlay7 from "../../../assets/icons/option-play-7.png";

const dataOption = [
  {
    icon: iconOptionPlay1,
    title: "Tournament Mode",
    content:
      "In this brand-new mode, The Coaches can buy competition tickets on our shop, which allow players to take part in the matches.",
  },
  {
    icon: iconOptionPlay2,
    title: "Manager Mode",
    content:
      "Similar to the Tournament Mode, online Manager Mode requires an entry ticket, and the player will take the role of a coach.",
  },
  {
    icon: iconOptionPlay5,
    title: "Results prediction of football matches",
    content:
      "You can place a bet for your favorite squat following the odds offered by bookmakers.",
  },
  {
    icon: iconOptionPlay3,
    title: "Simulation mode",
    content:
      "This mode allows players to create quick matches to play against others in other teams.",
  },
  {
    icon: iconOptionPlay4,
    title: "5V5 PVP Ranked Match",
    content:
      "In this mode, there will be five football players on each team. You can enter the game and choose a unique player from your team that you would like to participate in the match. ",
  },
];

const dataMarketplace = [
  {
    icon: iconOptionPlay6,
    title: "Shop",
    content:
      "The shop will allow in-game purchases for NFTs, competition tickets and necessary items such as energy drinks, first aid kits,... Each NFT is available in limited quantities.",
  },
  {
    icon: iconOptionPlay7,
    title: "Transfer Market",
    content:
      "The quantities of players are limited, so there is a place where you can exchange, buy and sell players called Transfer Market.",
  },
];

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  // paddingTop: theme.spacing(15),
  [theme.breakpoints.up("md")]: {
    paddingBottom: theme.spacing(15),
  },
}));

const VideoCardStyle = styled("iframe")(({ theme }) => ({
  width: "100%",
  height: 640,
  frameborder: "0",
  borderRadius: 20,
  borderColor: "transparent",
}));

const TitleStyle = styled(Typography)(({ theme }) => ({
  // fontSize: 40,
  width: "100%",
  // fontFamily: "inherit",
  background:
    "-webkit-linear-gradient(112deg, rgba(141, 198, 63, 1) 0%, rgba(57, 181, 74, 1) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  // fontWeight: "bold",
  font: "normal normal bold 40px Poppins",
}));

const IconFC = styled("img")(({ theme }) => ({
  width: 40,
  height: 40,
  // marginTop: 10,
  marginRight: 10,
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

const IconOptionPlay = styled("img")(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: 10,
  "&:hover": {
    opacity: 0.48,
    textDecoration: "none",
  },
}));

// ----------------------------------------------------------------------

export default function LandingMinimalHelps() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const renderContentOption = (item) => {
    const { icon, title, content } = item || {};
    return (
      <>
        <Grid key={"option-1"} item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              marginBottom: 5,
            }}
          >
            <IconOptionPlay src={icon} />
            <Grid container>
              <Grid item xs={12} md={12}>
                <Typography
                  style={{
                    // fontSize: 20,
                    width: "100%",
                    // fontFamily: "inherit",
                    font: "normal normal bold 20px Poppins",
                  }}
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography
                  style={{
                    // fontSize: 14,
                    width: "100%",
                    // fontFamily: "inherit",
                    font: "normal normal 14px Poppins",
                  }}
                >
                  {content}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </>
    );
  };

  return (
    <RootStyle>
      <Container maxWidth="xl">
        <Grid container spacing={isDesktop ? 15 : 5}>
          <Grid key={"blank-video"} item xs={12} md={3}></Grid>
          <Grid key={"video-introduce"} item xs={12} md={9}>
            <MotionInView variants={varFadeInUp}>
              <VideoCardStyle
                auto="true"
                allowFullScreen={true}
                src="https://www.youtube.com/embed/MbI1qYA-4IE"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </MotionInView>
          </Grid>
        </Grid>

        <Grid container spacing={isDesktop ? 15 : 5}>
          <Grid key={"blank-video"} item xs={12} md={3}></Grid>
          <Grid key={"video-introduce"} item xs={12} md={9}>
            <MotionInView variants={varFadeInUp}>
              <Typography
                style={{
                  // fontSize: 40,
                  width: "100%",
                  // fontFamily: "inherit",
                  // fontWeight: "bold",
                  marginTop: 20,
                  font: "normal normal bold 40px Poppins",
                }}
              >
                {"ADVENTURE THROUGH A"}
              </Typography>
              <TitleStyle>{"FIFA FOOTBALL ECOSYSTEM"}</TitleStyle>
            </MotionInView>
            {/* {'Option play'} */}
            <MotionInView variants={varFadeInUp}>
              <Box
                sx={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <IconFC src={iconFC} />
                <Typography
                  style={{
                    // fontSize: 40,
                    width: "100%",
                    // fontFamily: "inherit",
                    // fontWeight: "bold",
                    font: "normal normal bold 40px Poppins",
                  }}
                >
                  {"GAMEPLAY"}
                </Typography>
              </Box>
              <Grid item container spacing={isDesktop ? 10 : 5}>
                {dataOption.map((item) => {
                  return renderContentOption(item);
                })}
              </Grid>
            </MotionInView>
            {/* {'Market place'} */}
            <MotionInView variants={varFadeInUp}>
              <Box
                sx={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <IconFC src={iconFC} />
                <Typography
                  style={{
                    // fontSize: 40,
                    width: "100%",
                    // fontFamily: "inherit",
                    // fontWeight: "bold",
                    font: "normal normal bold 40px Poppins",
                  }}
                >
                  {"MARKETPLACE"}
                </Typography>
              </Box>
              <Grid item container spacing={isDesktop ? 10 : 5}>
                {dataMarketplace.map((item) => {
                  return renderContentOption(item);
                })}
              </Grid>
            </MotionInView>
            {/* {'OUR ROADMAP'} */}
            <MotionInView variants={varFadeInUp}>
              <Box
                sx={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <Typography
                  style={{
                    // fontSize: 40,
                    width: "100%",
                    // fontFamily: "inherit",
                    // fontWeight: "bold",
                    font: "normal normal bold 40px Poppins",
                  }}
                >
                  <div
                    style={{ font: "normal normal bold 40px/20px Poppins" }}
                    className="text-center text-sm-start"
                  >
                    OUR <span style={{ color: "#5abc46" }}>ROADMAP</span>
                  </div>
                </Typography>
              </Box>
              <Roadmap />
            </MotionInView>
            {/* {'OUR TEAM'} */}
            <MotionInView variants={varFadeInUp}>
              <Box
                sx={{
                  display: "flex",
                  direction: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <Typography
                  style={{
                    fontSize: 40,
                    width: "100%",
                    fontFamily: "inherit",
                    fontWeight: "bold",
                  }}
                >
                  <div
                    style={{
                      font: "normal normal bold 40px/20px Poppins",
                    }}
                    className="text-center text-sm-start"
                  >
                    OUR <span style={{ color: "#5abc46" }}>TEAM</span>
                  </div>
                </Typography>
              </Box>
              <Team />
            </MotionInView>
            <MotionInView variants={varFadeInUp}>
            </MotionInView>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
