import { Button } from "antd";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TURNROUND_ICON from "./../../../../assets/bridge/ios-repeat.png";
import BUSD_ICON from "./../../../../assets/bridge/BUSD.png";
import CHIP_ICON from "./../../../../assets/bridge/icon-chip.png";
import { Input, Spin } from "antd";
import {
  deposit_m3_BUSD,
  withdraw_m3_BUSD,
} from "../../../../web3/bridge.mjs";
import MetaConnect from "../../../../context/Provider";
import { getBalanceBUSD } from "../../../../web3/bridge.mjs";
import { intToWei } from "../../../../web3/utils.mjs";
import {
  CHAIN_ID,
  URL_DOMAIN,
  MAX_WITHDRAW,
  GET_CHIP_API,
  VERIFY_WITHDRAW_M3,
  CHECK_MISS_WITHDRAW_API_M3,
} from "../../../../const/const";
import {
  openNotificationSuccess,
  openNotificationError,
} from "../../../../components/notification";
import { postData, getData } from "../../../../apis/utils";
import "../index.css";

export const MODES = ["fifa_gold", "fifa_chip", "busd_chip"];

const TextAboveInput = styled.div`
  color: white;
  font: normal normal normal 15px Poppins;
  margin-bottom: 5px;
`;

const TextInsideInput = styled.div`
  font: normal normal bold 15px Poppins;
  color: #86c540;
  &: hover {
    cursor: pointer;
  }
`;

const IconT = styled.img`
  margin: auto auto;
  width: 40%;
`;

const Ip = styled(Input)`
  color: white;
  .ant-input {
    background-color: transparent;
    color: white;
  }
`;

const BtnDW = styled(Button)`
  margin: 0px auto;
  padding: 5px 20px;
  border-radius: 10px;
  background-color: #86c540;
  &: hover {
    background-color: #86c540;
  }
  &: focus {
    background-color: #86c540;
  }
`;

const BtnTurnRound = styled(Button)`
  width: 40px;
  height: 25px;
  margin: auto 0px;
  border-radius: 20px;
  background-color: #86c540;
  &: hover {
    background-color: #86c540;
  }
  &: focus {
    background-color: #86c540;
  }
  &: selected {
    background-color: #86c540;
  }
`;

const TextBtn = styled.div`
  color: white;
  font: normal normal bold 14px Poppins;
`;

const WrapperCryptoSymbol = styled.div`
  padding: 5px 10px;
  background-color: rgba(134, 197, 64, 0.2);
  border-radius: 10px;
  display: flex;
`;

const TextCryptoSymbol = styled.div`
  font: normal normal bold 20px Poppins;
  margin: auto 0px;
`;

const cryptoSymbol = (_imgSrc, _text, _colorText) => {
  return (
    <WrapperCryptoSymbol>
      <img className="me-2" src={_imgSrc} width="100%" alt="icon-crypto" />
      <TextCryptoSymbol style={{ color: _colorText }}>{_text}</TextCryptoSymbol>
    </WrapperCryptoSymbol>
  );
};

const App = (props) => {
  const _meta = useContext(MetaConnect);
  const [isDepositChip, setIsDepositChip] = useState(true);
  const [amountChip, setAmountChip] = useState(1000);
  const [isDepositingChip, setIsDepositingChip] = useState(false);
  const [isWithdrawingChip, setIsWithdrawingChip] = useState(false);
  const [isMissCaseChip, setIsMissCaseChip] = useState(false);
  const [isLoadMissCaseChip, setIsLoadMisCaseChip] = useState(false);
  const [dataMissCaseChip, setDataMissCaseChip] = useState([]);
  const [balanceChip, setBalanceChip] = useState(0);

  useEffect(() => {
    if (_meta.address) {
      getChip(_meta.address);
    } else {
      setBalanceChip(0);
    }
  }, [_meta.address]);

  const getChip = async (_address) => {
    try {
      if (!_address) return;
      const { balance } = await getData(`${GET_CHIP_API}${_address}`);
      if (balance) {
        setBalanceChip(balance);
      } else {
        setBalanceChip(0);
      }
    } catch (errer) {
      setBalanceChip(0);
    }
  };

  const handleClickMaxChip = () => {
    if (balanceChip >= MAX_WITHDRAW) setAmountChip(MAX_WITHDRAW);
    else setAmountChip(Math.trunc(balanceChip));
  };

  const handleIsDepositChip = async () => {
    if (isDepositChip) {
      setIsDepositChip(false);
      setIsLoadMisCaseChip(true);
      const { status, data } = await checkMissCaseChip(_meta.address);
      setIsLoadMisCaseChip(false);

      if (status) {
        setIsMissCaseChip(true);
        setDataMissCaseChip(data);
      } else {
        setIsMissCaseChip(false);
      }
    } else {
      setIsDepositChip(true);
      setIsMissCaseChip(false);
    }
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

  const formatBalance = (_balance) => {
    if (_balance >= 100000)
      return (_balance / 1000000).toFixed(2).toString() + "M";
    return _balance.toFixed(1);
  };

  const handleDepositChip = async () => {
    if (!_meta.isConnected || _meta.chainId !== CHAIN_ID) {
      openNotificationError(
        "topRight",
        "Metamask Problems!",
        "Metamask isnot connected or invalid chainId!"
      );
      return;
    }

    if (
      amountChip <= 0 ||
      typeof amountChip !== "number" ||
      !amountChip ||
      amountChip > _meta.balanceBUSD
    ) {
      openNotificationError("topRight", "Invalid Value", "Please check again!");
      return;
    }
    setIsDepositingChip(true);
    props.onLoadPage4(false);
    try {
      const txi = await deposit_m3_BUSD(
        _meta.web3,
        _meta.address,
        formatNumber(amountChip)
      );

      setIsDepositingChip(false);

      if (txi["status"] === "success") {
        openNotificationSuccess(
          "topRight",
          "Deposit Success!",
          "Check your balance!"
        );

        props.onLoadPage4(true);
        getBalanceBUSD(_meta.web3, _meta.address).then((e) =>
          _meta.setBalanceBUSD(Number(e) / Math.pow(10, 18))
        );

        await getChip(_meta.address);
      } else {
        openNotificationError(
          "topRight",
          "Deposit Fail!",
          "Please check again!"
        );
      }
    } catch (error) {
      setIsDepositingChip(false);
      openNotificationError("topRight", "Deposit Fail!", "Please check again!");
    }
  };

  const checkMissCaseChip = async (_address) => {
    try {
      if (!_address || !_meta.isConnected) return { status: false, data: {} };
      const rs = await getData(`${CHECK_MISS_WITHDRAW_API_M3}${_address}`);
      if (rs.status === 200) {
        return { status: true, data: rs.data };
      } else {
        return { status: false, data: {} };
      }
    } catch (error) {
      return { status: false, data: {} };
    }
  };

  const handleWithdrawChip = async () => {
    if (!_meta.isConnected || _meta.chainId !== CHAIN_ID) {
      openNotificationError(
        "topRight",
        "Metamask Problems!",
        "Metamask isnot connected or invalid chainId!"
      );
      return;
    }

    if (
      typeof amountChip !== "number" ||
      amountChip <= 0 ||
      amountChip > balanceChip
    ) {
      openNotificationError("topRight", "Invalid Value", "Please check again!");
      return;
    }

    setIsWithdrawingChip(true);
    props.onLoadPage5(false);

    const _from = _meta.address;
    const _url = URL_DOMAIN;
    const _amount = amountChip;
    const _timestamp = new Date().getTime();

    try {
      const VERIFY_MESSAGE = "Request Withdraw!";

      const DOMAIN = [
        { name: "url", type: "string" },
        { name: "time", type: "uint256" },
      ];

      const DATA = [
        { name: "action", type: "string" },
        { name: "user", type: "address" },
        { name: "amount", type: "uint256" },
      ];

      const msgParams = JSON.stringify({
        domain: {
          url: _url,
          time: _timestamp,
        },
        message: {
          action: VERIFY_MESSAGE,
          user: _from,
          amount: _amount,
        },
        primaryType: "Data",
        types: {
          EIP712Domain: DOMAIN,
          Data: DATA,
        },
      });

      let params = [_from, msgParams];
      let method = "eth_signTypedData_v4";

      window.web3.currentProvider.sendAsync(
        {
          method,
          params,
          from: _from,
        },
        async (error, rs) => {
          if (error || rs.error) {
            setIsWithdrawingChip(false);
            return;
          }
          const _verify = await postData(VERIFY_WITHDRAW_M3, {
            amount: _amount,
            signature: rs.result,
            timestamp: _timestamp,
            user: _from,
          });

          if (_verify.status !== 200) {
            openNotificationError(
              "topRight",
              "Withdraw Fail!",
              "Please check again!"
            );
          } else {
            const txi = await withdraw_m3_BUSD(
              _meta.web3,
              _from,
              _verify["data"]["amount"],
              _verify["data"]["timestamp"],
              _verify["data"]["v"],
              _verify["data"]["r"],
              _verify["data"]["s"]
            );

            if (txi["status"] === "success") {
              openNotificationSuccess(
                "topRight",
                "Withdraw Success!",
                "Check your balance!"
              );
              getBalanceBUSD(_meta.web3, _meta.address).then((e) =>
                _meta.setBalanceBUSD(Number(e) / Math.pow(10, 18))
              );
              await getChip(_meta.address);
            } else {
              openNotificationError(
                "topRight",
                "Withdraw Fail!",
                "Please check again!"
              );
              setIsLoadMisCaseChip(true);
              const { status, data } = await checkMissCaseChip(_meta.address);
              setIsLoadMisCaseChip(false);

              if (status) {
                setIsMissCaseChip(true);
                setDataMissCaseChip(data);
              }
            }
          }

          props.onLoadPage5(true);
          setIsWithdrawingChip(false);
        }
      );
    } catch (error) {
      props.onLoadPage5(false);
      setIsWithdrawingChip(false);
    }
  };

  const handleMissCaseChip = async () => {
    if (!_meta.isConnected || _meta.chainId !== CHAIN_ID) {
      openNotificationError(
        "topRight",
        "Metamask Problems!",
        "Metamask isnot connected or invalid chainId!"
      );
      return;
    }

    setIsWithdrawingChip(true);
    props.onLoadPage5(false);

    try {
      const txi = await withdraw_m3_BUSD(
        _meta.web3,
        _meta.address,
        dataMissCaseChip["amount"],
        dataMissCaseChip["timestamp"],
        dataMissCaseChip["v"],
        dataMissCaseChip["r"],
        dataMissCaseChip["s"]
      );

      if (txi["status"] === "success") {
        openNotificationSuccess(
          "topRight",
          "Claim Success!",
          "Check your balance!"
        );
        getBalanceBUSD(_meta.web3, _meta.address).then((e) =>
          _meta.setBalanceBUSD(Number(e) / Math.pow(10, 18))
        );
        await getChip(_meta.address);
        props.onLoadPage5(true);
        setIsMissCaseChip(false);
        setDataMissCaseChip([]);
      } else {
        openNotificationError("topRight", "Claim Fail!", "Please check again!");
      }

      setIsWithdrawingChip(false);
    } catch (error) {
      openNotificationError("topRight", "Claim Fail!", "Please check again!");
      setIsWithdrawingChip(false);
    }
  };

  const handleChangeChip = (e) => {
    setAmountChip(Number(e.target.value));
  };

  return (
    <div className="w-100">
      <div className="mx-auto">
        {/*----- Button TurnAround------ */}
        <div className="d-flex justify-content-center px-3 ">
          <>
            {isDepositChip
              ? cryptoSymbol(BUSD_ICON, "BUSD", "#8dc63f")
              : cryptoSymbol(CHIP_ICON, "CHIP", "#f3ba2f")}
            <BtnTurnRound
              className="d-flex justify-content-center align-items-center mx-2"
              size={"middle"}
              icon={<IconT src={TURNROUND_ICON} height="auto" />}
              onClick={handleIsDepositChip}
            />
            {!isDepositChip
              ? cryptoSymbol(BUSD_ICON, "BUSD", "#8dc63f")
              : cryptoSymbol(CHIP_ICON, "CHIP", "#f3ba2f")}
          </>
        </div>

        <Spin spinning={isLoadMissCaseChip}>
          {/* --------Information Ratio--------- */}
          {
            <TextAboveInput className="text-center mt-3">
              {isMissCaseChip
                ? ""
                : isDepositChip
                ? "1 BUSD ~ 1 CHIP"
                : "1 CHIP ~ 1 BUSD (Fee 10%)"}
            </TextAboveInput>
          }
          {/* --------Information Balance--------- */}
          <div className="mt-3 w-100 px-3">
            <div className="d-flex justify-content-center">
              <div
                className="d-flex justify-content-between"
                style={{ width: 300 }}
              >
                <TextAboveInput>
                  {formatBalance(_meta.balanceBUSD)} BUSD
                </TextAboveInput>
                <TextAboveInput>
                  {`${formatBalance(balanceChip)} CHIP`}
                </TextAboveInput>
              </div>
            </div>
            {/* ------Input amount--------- */}
            {
              <>
                {isMissCaseChip ? (
                  <TextAboveInput className="text-center">
                    You have a case of withdrawal CHIP error, claim it rightnow!
                  </TextAboveInput>
                ) : (
                  <div className="text-center">
                    <Ip
                      onChange={handleChangeChip}
                      value={amountChip}
                      type="number"
                      style={{
                        borderRadius: 5,
                        backgroundColor: "transparent",
                        width: 300,
                      }}
                      suffix={
                        isDepositChip ? (
                          ""
                        ) : (
                          <TextInsideInput onClick={handleClickMaxChip}>
                            MAX
                          </TextInsideInput>
                        )
                      }
                    />
                  </div>
                )}
              </>
            }
          </div>
          {/* ------Button Withdraw, deposit, claim--------- */}
          <div className="mt-3">
            {isDepositChip ? (
              <BtnDW
                onClick={(e) => handleDepositChip()}
                size={"middle"}
                className="d-flex justify-content-center"
              >
                {isDepositingChip ? (
                  <div className="d-flex align-items-center">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <TextBtn className="ms-2">DEPOSITING . . .</TextBtn>
                  </div>
                ) : (
                  <TextBtn className="ms-2">DEPOSIT</TextBtn>
                )}
              </BtnDW>
            ) : (
              <BtnDW
                onClick={
                  isMissCaseChip ? handleMissCaseChip : handleWithdrawChip
                }
                size={"middle"}
                className="d-flex justify-content-center"
              >
                {isWithdrawingChip ? (
                  <div className="d-flex align-items-center">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <TextBtn className="ms-2">
                      {isMissCaseChip ? `CLAIMING . . .` : `WITHDRAWING . . .`}
                    </TextBtn>
                  </div>
                ) : (
                  <TextBtn className="ms-2">
                    {isMissCaseChip ? `CLAIM` : `WITHDRAW`}
                  </TextBtn>
                )}
              </BtnDW>
            )}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default App;
