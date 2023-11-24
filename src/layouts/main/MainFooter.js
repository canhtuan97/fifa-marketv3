import { styled } from "@mui/material/styles";
import { Divider, Container } from "@mui/material";
import FooterComponent from "./footerComponent";

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 7 }}>
        <FooterComponent />
      </Container>
    </RootStyle>
  );
}
