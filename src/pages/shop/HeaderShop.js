import React, { useContext } from "react";
import styled from "styled-components";
import ICON_BNB from "./../../assets/shop/icon-token-bnb.png";
import ICON_FIFA from "./../../assets/shop/icon-token-fifa.png";
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
  font: normal normal bold 34px Poppins;
  color: white;
  @media (max-width: 768px) {
    font: normal normal bold 20px Poppins;
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
  const formatBalance = (_balance) => {
    if (_balance >= 100000)
      return (_balance / 1000000).toFixed(2).toString() + "M";
    return _balance.toFixed(1);
  };

  return (
    <Wrapper className="row mx-0">
      <div className="col-12 col-sm-12 col-md-12 d-flex pb-md-0">
        <WrapperGroup className="me-1 me-md-4 justify-content-center pe-3">
          <ImgResponsive src={ICON_FIFA} />
          <Divider />
          <div>
            <TokenName className="mt-2">FIFAC</TokenName>
            <Balance>{formatBalance(_meta.balanceFF)}</Balance>
          </div>
        </WrapperGroup>
        <WrapperGroup className="ms-1 ms-md-4 justify-content-center">
          <ImgResponsive src={ICON_BNB} />
          <Divider />
          <div>
            <TokenName className="mt-2 text-warning">BNB</TokenName>
            <Balance>{_meta.balance.toFixed(2)}</Balance>
          </div>
        </WrapperGroup>
      </div>
    </Wrapper>
  );
};
