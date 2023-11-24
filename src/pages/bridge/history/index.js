import { Tabs } from "antd";
import React from "react";
import HistoryDeposit from "./history-deposit";
import HistoryWithdraw from "./history-withdraw";
// import { Faucet } from "./faucet";

const { TabPane } = Tabs;

const App = ({ isLoadPage, isLoadPage1, isLoadPage2, isLoadPage3, isLoadPage4, isLoadPage5, mode }) => (
  <Tabs defaultActiveKey="1" size="small" tabBarStyle={{ color: "white" }}>
    <TabPane
      tab={
        <span style={{ color: "#5abc45", fontWeight: "bold" }}>DEPOSIT</span>
      }
      key="1"
    >
      <HistoryDeposit
        isLoadPage={isLoadPage}
        isLoadPage2={isLoadPage2}
        isLoadPage4={isLoadPage4}
        mode={mode}
      />
    </TabPane>
    <TabPane
      tab={
        <span style={{ color: "#5abc45", fontWeight: "bold" }}>WITHDRAW</span>
      }
      key="2"
    >
      <HistoryWithdraw
        isLoadPage1={isLoadPage1}
        isLoadPage3={isLoadPage3}
        isLoadPage5={isLoadPage5}
        mode={mode}
      />
    </TabPane>
    {/* <TabPane
      tab={
        <span style={{ color: "#5abc45", fontWeight: "bold" }}>
          FAUCET FIFA
        </span>
      }
      key="3"
    >
      <Faucet />
    </TabPane> */}
  </Tabs>
);

export default App;
