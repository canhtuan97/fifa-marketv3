import React, { useContext } from "react";
import styled from "styled-components";
import ICON_BNB from "./../../assets/shop/icon-token-bnb.png";
import ICON_FIFA from "./../../assets/shop/icon-token-fifa.png";
import ICON_$ from "./../../assets/shop/group_656-2x.png";
import DataMeta from "./../../context/Provider";

const Wrapper = styled.div`
  background-color: #0b1f4f;
  // width: 100%;
  margin-bottom: 30px;
  padding: 20px 40px;
  border-radius: 10px;
  display: flex;
  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

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

const WrapperGroup = styled.div`
  display: flex;
  padding: 0px 0px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

const Divider = styled.div`
  margin: auto 15px;
  border-left: 1px solid white;
  width: 1px;
  height: 65px;
  opacity: 0.5;
  @media (max-width: 768px) {
    height: 50px;
  }
`;

const TokenName = styled.div`
  font: normal normal bold 18px Poppins;
  color: #8dc63f;

  @media (max-width: 768px) {
    font: normal normal bold 14px Poppins;
  }
`;

const Balance = styled.div`
  font: normal normal bold 27px Poppins;
  color: white;
  @media (max-width: 768px) {
    font: normal normal bold 28px Poppins;
  }
`;

const Btn = styled.div`
  font: normal normal bold 16px Poppins;
  border-radius: 10px;
  border: 1px solid #5abc45;
  width: 140px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  @media (max-width: 768px) {
    font: normal normal bold 12px Poppins;
    padding: 7px 12px;
    width: 105px;
  }
`;

const Icon = styled.img`
  width: 20% !important;
  height: auto;
`;

export const HeaderShop = () => {
  const _meta = useContext(DataMeta);

  function getGold(gold) {
    let text = gold.toFixed(0) + "";
    if (text.length > 9) {
      return (gold / 1000000000).toFixed(1) + "B"
    } else if (text.length > 6) {
      return (gold / 1000000).toFixed(1) + "M"
    } else if (gold == 0) {
      return 0;
    } else {
      return gold.toFixed(2);
    }
  }
  function getFF(gold) {
    let text = gold.toFixed(0) + "";
    if (text.length > 5) {
      return (gold / 1000000).toFixed(2) + "M"
    } else if (gold == 0) {
      return 0;
    } else {
      return gold.toFixed(2);
    }
  }



  return (
    <div className="c-play-boardx">
      <div className="c-play-boardx__left">
        <ul>
          <li>
            <div className="c-play-boardx__icon"><i className="icon52-coin"></i></div>
            <div className="c-play-boardx__content">
              <label>FIFAC</label>
              <div className="c-play-boardx__numberx">{getFF((_meta.balanceFF))}</div>
            </div>
          </li>
          <li>
            <div className="c-play-boardx__icon"><i className="icon52-bnb"></i></div>
            <div className="c-play-boardx__content">
              <label className="text-bnb">BNB</label>
              <div className="c-play-boardx__numberx">{(_meta.balance).toFixed(2)}</div>
            </div>
          </li>
        </ul>
      </div>
      {/* <div className="c-play-boardx__right">
        <button className="c-play-boardx__convert" type="button"><i className="icon22-convert-white"></i>Convert</button>
      </div> */}
    </div>
  );
};
