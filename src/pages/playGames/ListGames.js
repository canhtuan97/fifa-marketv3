import React, { useContext, memo, useEffect, useState } from "react";
import DataMeta from "../../context/Provider";
import ICON_BNB from "./../../assets/shop/icon-token-bnb.png";
import ICON_FIFA from "./../../assets/shop/icon-token-fifa.png";
import M1 from "./../../assets/playgames/1.png";
import M2 from "./../../assets/playgames/2.png";
import M3 from "./../../assets/playgames/3.png";
import M4 from "./../../assets/playgames/4.png";
import M5 from "./../../assets/playgames/5.png";
import ICON_GOLD from "./../../assets/playgames/icon-gold.png";
import CHIP_ICON from "./../../assets/bridge/icon-chip.png";
import { getData } from "./../../apis/utils";
import { GET_GOLD_API, GET_CHIP_API } from "./../../const/const";
import styled from "styled-components";

const ImgResponsive = styled.img`
  width: 15 %;
  height: auto;
  margin: auto;
  @media (max-width: 768px) {
    width: 30%;
    height: auto;
    margin-right: 0px;
    margin-left: 0px;
  }
`;

const WrapperBox = styled.div`
  padding: 10px 20px;
  @media (max-width: 768px) {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  border-radius: 10px;
  background-color: rgba(11, 31, 79, 1);
  width: 100%;
`;

const WrapperGroup = styled.div`
  width: fit-content;
  display: flex;
  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const Divider = styled.div`
  margin: auto 15px;
  border-left: 1px solid white;
  width: 1px;
  height: 65px;
  opacity: 0.5;
  @media (max-width: 768px) {
    height: 35px;
    margin: auto 10px;
  }
`;

const TokenName = styled.div`
  font: normal normal bold 18px Poppins;
  @media (max-width: 768px) {
    font: normal normal bold 10px Poppins;
  }
`;

const Balance = styled.div`
  font: normal normal bold 20px Poppins;
  color: white;
  @media (max-width: 768px) {
    font: normal normal bold 14px Poppins;
  }
`;

const Items = styled.div`
  &: hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;

const formatBalance = (_balance) => {
  if (_balance >= 100000)
    return (_balance / 1000000).toFixed(2).toString() + "M";
  return _balance.toFixed(1);
};

const formatBNB = (_balance) => {
  if (_balance >= 100000)
    return (_balance / 1000000).toFixed(2).toString() + "M";
  if (_balance < 1) return _balance.toFixed(3);
  return _balance.toFixed(2);
};

const BoxBalance = memo(({ icon, balance, color, title }) => {
  return (
    <WrapperBox>
      <WrapperGroup>
        <ImgResponsive src={icon} />
        <Divider />
        <div>
          <TokenName style={{ color }} className="mt-2">
            {title}
          </TokenName>
          <Balance>
            {title === "BNB" ? formatBNB(balance) : formatBalance(balance)}
          </Balance>
        </div>
      </WrapperGroup>
    </WrapperBox>
  );
});

const ListGames = () => {
  const _meta = useContext(DataMeta);
  const [balanceG, setBalanceG] = useState(10345);
  const [balanceC, setBalanceC] = useState(0);

  const getGold = async (_address) => {
    try {
      if (!_address) return;
      const { gold } = await getData(`${GET_GOLD_API}${_address}`);
      if (gold !== undefined && gold) {
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
        setBalanceC(balance);
      } else {
        setBalanceC(0);
      }
    } catch (error) {
      setBalanceC(0);
    }
  };

  useEffect(() => {
    getGold(_meta.address);
    getChip(_meta.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getGold(_meta.address);
    getChip(_meta.address);
  }, [_meta.address]);

  return (
    <>
      <div className="row row-cols-2 row-cols-md-4 g-3">
        <div className="col">
          <BoxBalance
            icon={ICON_FIFA}
            balance={_meta.balanceFF}
            color="#f3ba2f"
            title="FIFAC"
          />
        </div>
        <div className="col">
          <BoxBalance
            icon={ICON_BNB}
            balance={_meta.balance}
            color="#f3ba2f"
            title="BNB"
          />
        </div>
        <div className="col">
          <BoxBalance
            icon={ICON_GOLD}
            balance={balanceG}
            color="#f3ba2f"
            title="GOLD"
          />
        </div>
        <div className="col">
          <BoxBalance
            icon={CHIP_ICON}
            balance={balanceC}
            color="#f3ba2f"
            title="CHIP"
          />
        </div>
      </div>
      <div className="d-flex gap-1"></div>
      <div className="row row-cols-1 row-cols-md-2 pt-4 gx-4 gy-3 pb-5">
        <Items className="col d-flex align-items-end">
          <a
            href="https://farm.fifafootball.io/play"
            target="_blank"
            rel="noreferrer"
          >
            <img src={M1} alt="" />
          </a>
        </Items>
        <Items className="col d-flex align-items-end">
          <a
            href="https://predict.fifafootball.io/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={M2} alt="" />
          </a>
        </Items>
        <Items className="col d-flex align-items-end">
          <img src={M3} alt="" />
        </Items>
        <Items className="col d-flex align-items-end">
          <img src={M4} alt="" />
        </Items>
        <Items className="col d-flex align-items-end">
          <img src={M5} alt="" />
        </Items>
      </div>
    </>
  );
};

export { ListGames };
