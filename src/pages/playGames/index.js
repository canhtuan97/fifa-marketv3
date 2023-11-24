import { styled } from "@mui/material/styles";
import Page from "../../components/Page";
import LayoutListGames from "./LayoutListGames";

const RootStyle = styled(Page)({
  minHeight: "100%",
});

export default function IdoPage() {
  return (
    <RootStyle title="FIFA Football" id="move_top">
      <LayoutListGames />
    </RootStyle>
  );
}
