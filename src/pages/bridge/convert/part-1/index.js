import { Button, Modal } from "antd";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TURNROUND_ICON from "./../../../../assets/bridge/ios-repeat.png";
import FIFA_ICON from "./../../../../assets/bridge/icon-ff.png";
import GOLD_ICON from "./../../../../assets/bridge/icon-gold.png";
import CHIP_ICON from "./../../../../assets/bridge/icon-chip.png";
import { Input, Spin } from "antd";
import {
  deposit,
  deposit_m3,
  withdraw,
  withdraw_m3,
} from "../../../../web3/bridge.mjs";
import MetaConnect from "../../../../context/Provider";
import { getBalanceFIFA } from "../../../../web3/shop.mjs";
import { intToWei } from "../../../../web3/utils.mjs";
import {
  CHAIN_ID,
  CHECK_MISS_WITHDRAW_API,
  VERIFY_WITHDRAW,
  URL_DOMAIN,
  MAX_WITHDRAW,
  GET_GOLD_API,
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

const Btn = styled(Button)`
  @media (max-width: 576px) {
    width: 180px;
  }
  border: 1px solid #86c540;
  background-color: transparent;
  &: hover {
    background-color: #86c540;
    color: white;
  }

  &: focus {
    background-color: #86c540;
    color: white;
  }
  border-radius: 5px;
  color: #86c540;
  font: normal normal normal 15px Poppins;
`;

const TextTitle = styled.div`
  font: normal normal bold 25px Poppins;
  color: white;
  display: flex;
  align-items: center;
`;
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
  const { mode } = props;

  //Mode 0
  const [isDeposit, setIsDeposit] = useState(true);
  const [amount, setAmount] = useState(1000);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isMissCase, setIsMissCase] = useState(false);
  const [isLoadMissCase, setIsLoadMisCase] = useState(false);
  const [dataMissCase, setDataMissCase] = useState([]);
  const [balanceG, setBalanceG] = useState(0);

  //Mode 1
  const [isDepositChip, setIsDepositChip] = useState(true);
  const [amountChip, setAmountChip] = useState(1000);
  const [isDepositingChip, setIsDepositingChip] = useState(false);
  const [isWithdrawingChip, setIsWithdrawingChip] = useState(false);
  const [isMissCaseChip, setIsMissCaseChip] = useState(false);
  const [isLoadMissCaseChip, setIsLoadMisCaseChip] = useState(false);
  const [dataMissCaseChip, setDataMissCaseChip] = useState([]);
  const [balanceChip, setBalanceChip] = useState(0);

  useEffect(() => {
    const getGoldInit = async () => {
      try {
        if (!_meta.address) return;
        const { gold } = await getData(`${GET_GOLD_API}${_meta.address}`);
        setBalanceG(gold);
      } catch (error) {
        setBalanceG(0);
      }
    };
    if (_meta.address) {
      getGoldInit(_meta.address);
      getChip(_meta.address);
    } else {
      setBalanceG(0);
      setBalanceChip(0);
    }
  }, [_meta.address]);

  const getGold = async (_address) => {
    try {
      if (!_address) return;
      const { gold } = await getData(`${GET_GOLD_API}${_address}`);
      if (gold !== undefined && gold !== null) {
        setBalanceG(gold);
      } else {
        setBalanceG(0);
      }
    } catch (error) {
      setBalanceG(0);
    }
  };

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

  const handleClickMax = () => {
    if (_meta.balanceG >= MAX_WITHDRAW) setAmount(MAX_WITHDRAW);
    else setAmount(Math.trunc(balanceG));
  };

  const handleClickMaxChip = () => {
    if (balanceChip >= MAX_WITHDRAW) setAmountChip(MAX_WITHDRAW);
    else setAmountChip(Math.trunc(balanceChip));
  };

  const handleIsDeposit = async () => {
    if (isDeposit) {
      setIsDeposit(false);
      setIsLoadMisCase(true);
      const { status, data } = await checkMissCase(_meta.address);
      setIsLoadMisCase(false);

      if (status) {
        setIsMissCase(true);
        setDataMissCase(data);
      } else {
        setIsMissCase(false);
      }
    } else {
      setIsDeposit(true);
      setIsMissCase(false);
    }
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

  const handleDeposit = async () => {
    if (!_meta.isConnected || _meta.chainId !== CHAIN_ID) {
      openNotificationError(
        "topRight",
        "Metamask Problems!",
        "Metamask isnot connected or invalid chainId!"
      );
      return;
    }

    if (
      amount <= 0 ||
      typeof amount !== "number" ||
      !amount ||
      amount > _meta.balanceFF
    ) {
      openNotificationError("topRight", "Invalid Value", "Please check again!");
      return;
    }

    setIsDepositing(true);
    props.onLoadPage(false);
    try {
      const txi = await deposit(
        _meta.web3,
        _meta.address,
        formatNumber(amount)
      );
      setIsDepositing(false);
      if (txi["status"] === "success") {
        openNotificationSuccess(
          "topRight",
          "Deposit Success!",
          "Check your balance!"
        );
        props.onLoadPage(true);
        getBalanceFIFA(_meta.web3, _meta.address).then((e) =>
          _meta.setBalanceFF(Number(e) / Math.pow(10, 18))
        );
        await getGold(_meta.address);
      } else {
        openNotificationError(
          "topRight",
          "Deposit Fail!",
          "Please check again!"
        );
      }
    } catch (error) {
      setIsDepositing(false);
      openNotificationError("topRight", "Deposit Fail!", "Please check again!");
    }
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
      amountChip > _meta.balanceFF
    ) {
      openNotificationError("topRight", "Invalid Value", "Please check again!");
      return;
    }
    setIsDepositingChip(true);
    props.onLoadPage2(false);
    try {
      const txi = await deposit_m3(
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

        props.onLoadPage2(true);
        getBalanceFIFA(_meta.web3, _meta.address).then((e) =>
          _meta.setBalanceFF(Number(e) / Math.pow(10, 18))
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

  const checkMissCase = async (_address) => {
    try {
      if (!_address || !_meta.isConnected) return { status: false, data: {} };
      const rs = await getData(`${CHECK_MISS_WITHDRAW_API}${_address}`);
      if (rs.status === 200) {
        return { status: true, data: rs.data };
      } else {
        return { status: false, data: {} };
      }
    } catch (error) {
      return { status: false, data: {} };
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

  const handleWithdraw = async () => {
    if (!_meta.isConnected || _meta.chainId !== CHAIN_ID) {
      openNotificationError(
        "topRight",
        "Metamask Problems!",
        "Metamask isnot connected or invalid chainId!"
      );
      return;
    }

    if (typeof amount !== "number" || amount <= 0 || amount > balanceG) {
      openNotificationError("topRight", "Invalid Value", "Please check again!");
      return;
    }

    setIsWithdrawing(true);
    props.onLoadPage1(false);

    const _from = _meta.address;
    const _url = URL_DOMAIN;
    const _amount = amount;
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
          amount: intToWei(_amount),
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
            setIsWithdrawing(false);
            return;
          }

          const _verify = await postData(VERIFY_WITHDRAW, {
            amount: intToWei(_amount),
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
            const txi = await withdraw(
              _meta.web3,
              _from,
              _verify["data"]["amount"],
              _verify["data"]["earn_game"],
              _verify["data"]["spend_game"],
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
              getBalanceFIFA(_meta.web3, _meta.address).then((e) =>
                _meta.setBalanceFF(Number(e) / Math.pow(10, 18))
              );
              await getGold(_meta.address);
            } else {
              openNotificationError(
                "topRight",
                "Withdraw Fail!",
                "Please check again!"
              );
              setIsLoadMisCase(true);
              const { status, data } = await checkMissCase(_meta.address);
              setIsLoadMisCase(false);

              if (status) {
                setIsMissCase(true);
                setDataMissCase(data);
              }
            }
          }

          props.onLoadPage1(true);
          setIsWithdrawing(false);
        }
      );
    } catch (error) {
      props.onLoadPage1(false);
      setIsWithdrawing(false);
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
    props.onLoadPage3(false);

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
            const txi = await withdraw_m3(
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
              getBalanceFIFA(_meta.web3, _meta.address).then((e) =>
                _meta.setBalanceFF(Number(e) / Math.pow(10, 18))
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

          props.onLoadPage3(true);
          setIsWithdrawingChip(false);
        }
      );
    } catch (error) {
      props.onLoadPage3(false);
      setIsWithdrawingChip(false);
    }
  };

  const handleMissCase = async () => {
    if (!_meta.isConnected || _meta.chainId !== CHAIN_ID) {
      openNotificationError(
        "topRight",
        "Metamask Problems!",
        "Metamask isnot connected or invalid chainId!"
      );
      return;
    }

    setIsWithdrawing(true);
    props.onLoadPage1(false);

    try {
      const txi = await withdraw(
        _meta.web3,
        _meta.address,
        dataMissCase["amount"],
        dataMissCase["earn_game"],
        dataMissCase["spend_game"],
        dataMissCase["timestamp"],
        dataMissCase["v"],
        dataMissCase["r"],
        dataMissCase["s"]
      );

      if (txi["status"] === "success") {
        openNotificationSuccess(
          "topRight",
          "Claim Success!",
          "Check your balance!"
        );
        getBalanceFIFA(_meta.web3, _meta.address).then((e) =>
          _meta.setBalanceFF(Number(e) / Math.pow(10, 18))
        );
        await getGold(_meta.address);
        props.onLoadPage1(true);
        setIsMissCase(false);
        setDataMissCase([]);
      } else {
        openNotificationError("topRight", "Claim Fail!", "Please check again!");
      }

      setIsWithdrawing(false);
    } catch (error) {
      openNotificationError("topRight", "Claim Fail!", "Please check again!");
      setIsWithdrawing(false);
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
    props.onLoadPage3(false);

    try {
      const txi = await withdraw_m3(
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
        getBalanceFIFA(_meta.web3, _meta.address).then((e) =>
          _meta.setBalanceFF(Number(e) / Math.pow(10, 18))
        );
        await getChip(_meta.address);
        props.onLoadPage3(true);
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

  const handleChange = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleChangeChip = (e) => {
    setAmountChip(Number(e.target.value));
  };

  const checkMode0 = () => {
    return mode === MODES[0] ? true : false;
  };

  return (
    <div className="w-100">
      <div className="mx-auto">
        {/*----- Button TurnAround------ */}
        <div className="d-flex justify-content-center px-3 ">
          {mode === MODES[0] ? (
            <>
              {isDeposit
                ? cryptoSymbol(FIFA_ICON, "FIFAC", "#8dc63f")
                : cryptoSymbol(GOLD_ICON, "GOLD", "#f3ba2f")}
              <BtnTurnRound
                className="d-flex justify-content-center align-items-center mx-2"
                size={"middle"}
                icon={<IconT src={TURNROUND_ICON} height="auto" />}
                onClick={handleIsDeposit}
              />
              {!isDeposit
                ? cryptoSymbol(FIFA_ICON, "FIFAC", "#8dc63f")
                : cryptoSymbol(GOLD_ICON, "GOLD", "#f3ba2f")}
            </>
          ) : (
            <>
              {isDepositChip
                ? cryptoSymbol(FIFA_ICON, "FIFAC", "#8dc63f")
                : cryptoSymbol(CHIP_ICON, "CHIP", "#f3ba2f")}
              <BtnTurnRound
                className="d-flex justify-content-center align-items-center mx-2"
                size={"middle"}
                icon={<IconT src={TURNROUND_ICON} height="auto" />}
                onClick={handleIsDepositChip}
              />
              {!isDepositChip
                ? cryptoSymbol(FIFA_ICON, "FIFAC", "#8dc63f")
                : cryptoSymbol(CHIP_ICON, "CHIP", "#f3ba2f")}
            </>
          )}
        </div>

        <Spin spinning={checkMode0() ? isLoadMissCase : isLoadMissCaseChip}>
          {/* --------Information Ratio--------- */}
          {checkMode0() ? (
            <TextAboveInput className="text-center mt-3">
              {isMissCase
                ? ""
                : isDeposit
                ? "1 FIFAC ~ 1 GOLD"
                : "1 GOLD ~ 0.9 FIFAC"}
            </TextAboveInput>
          ) : (
            <TextAboveInput className="text-center mt-3">
              {isMissCaseChip
                ? ""
                : isDepositChip
                ? "1 FIFA ~ 3 CHIP"
                : "3 CHIP ~ 1 FIFA"}
            </TextAboveInput>
          )}
          {/* --------Information Balance--------- */}
          <div className="mt-3 w-100 px-3">
            <div className="d-flex justify-content-center">
              <div
                className="d-flex justify-content-between"
                style={{ width: 300 }}
              >
                <TextAboveInput>
                  {formatBalance(_meta.balanceFF)} FIFAC
                </TextAboveInput>
                <TextAboveInput>
                  {checkMode0()
                    ? `${formatBalance(balanceG)} GOLD`
                    : `${formatBalance(balanceChip)} CHIP`}
                </TextAboveInput>
              </div>
            </div>
            {/* ------Input amount--------- */}
            {checkMode0() ? (
              <>
                {isMissCase ? (
                  <TextAboveInput className="text-center">
                    You have a case of withdrawal GOLD error, claim it rightnow!
                  </TextAboveInput>
                ) : (
                  <div className="text-center">
                    <Ip
                      onChange={handleChange}
                      value={amount}
                      type="number"
                      style={{
                        borderRadius: 5,
                        backgroundColor: "transparent",
                        width: 300,
                      }}
                      suffix={
                        isDeposit ? (
                          ""
                        ) : (
                          <TextInsideInput onClick={handleClickMax}>
                            MAX
                          </TextInsideInput>
                        )
                      }
                    />
                  </div>
                )}
              </>
            ) : (
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
            )}
          </div>
          {/* ------Button Withdraw, deposit, claim--------- */}
          <div className="mt-3">
            {checkMode0() ? (
              <>
                {isDeposit ? (
                  <BtnDW
                    onClick={(e) => handleDeposit()}
                    size={"middle"}
                    className="d-flex justify-content-center"
                  >
                    {isDepositing ? (
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
                    onClick={isMissCase ? handleMissCase : handleWithdraw}
                    size={"middle"}
                    className="d-flex justify-content-center"
                  >
                    {isWithdrawing ? (
                      <div className="d-flex align-items-center">
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <TextBtn className="ms-2">
                          {isMissCase ? `CLAIMING . . .` : `WITHDRAWING . . .`}
                        </TextBtn>
                      </div>
                    ) : (
                      <TextBtn className="ms-2">
                        {isMissCase ? `CLAIM` : `WITHDRAW`}
                      </TextBtn>
                    )}
                  </BtnDW>
                )}
              </>
            ) : (
              <>
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
                          {isMissCaseChip
                            ? `CLAIMING . . .`
                            : `WITHDRAWING . . .`}
                        </TextBtn>
                      </div>
                    ) : (
                      <TextBtn className="ms-2">
                        {isMissCaseChip ? `CLAIM` : `WITHDRAW`}
                      </TextBtn>
                    )}
                  </BtnDW>
                )}
              </>
            )}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default App;
