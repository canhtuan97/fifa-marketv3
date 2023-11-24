import React, { useState, useContext } from "react";
import { Button } from "antd";
import { getData } from "../../../apis/utils";
import { FAUCET_API, CHAIN_ID } from "../../../const/const";
import MetaConnect from "../../../context/Provider";
import {
  openNotificationError,
  openNotificationSuccess,
} from "../../../components/notification";
import { WalletOutlined } from "@ant-design/icons";

export const Faucet = () => {
  const _meta = useContext(MetaConnect);
  const [isLoading, setIsLoading] = useState(false);
  const faucetFIFA = async () => {
    if (!_meta.isConnected || _meta.chainId !== CHAIN_ID) {
      openNotificationError(
        "topRight",
        "Metamask Problems!",
        "Metamask isnot connected or invalid chainId!"
      );
      return;
    }

    setIsLoading(true);
    const rs = await getData(`${FAUCET_API}${_meta.address}`);
    setIsLoading(false);
    if (rs.status === 200) {
      openNotificationSuccess(
        "topRight",
        "Faucet Success!",
        rs.msg ?? "Check your balance!"
      );
    } else {
      openNotificationError(
        "topRight",
        "Faucet Fail!",
        rs.msg ?? "Check again!"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 mt-5">
      <Button
        style={{
          margin: "auto",
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
        }}
        icon={<WalletOutlined />}
        onClick={faucetFIFA}
        loading={isLoading}
      >
        GIVE ME FIFA
      </Button>
    </div>
  );
};
