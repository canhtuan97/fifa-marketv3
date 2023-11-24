// material
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";
import {
  LandingHero,
  LandingMinimal,
} from "../components/_external-pages/landing";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: "100%",
});

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="FIFA Football" description="PLAY TO EARN" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingMinimal />
      </ContentStyle>
    </RootStyle>
  );
}
