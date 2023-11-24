import { styled } from "@mui/material/styles";
import Page from "../../components/Page";
import LayoutIdo from "./LayoutIdo"

const RootStyle = styled(Page)({
  minHeight: "100% !important",
});

export default function IdoPage() {
  return (
    <RootStyle title="FIFA Football" id="move_top">
      <LayoutIdo />
    </RootStyle>
  );
}
