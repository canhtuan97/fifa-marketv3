import { styled } from "@mui/material/styles";
import Page from "../../components/Page";
import LayoutCommission from "./LayoutBridge"

const RootStyle = styled(Page)({
  minHeight: "100% !important",
});

export default function CommissionPage() {
  return (
    <RootStyle title="FIFA Football" id="move_top">
      <LayoutCommission />
    </RootStyle>
  );
}
