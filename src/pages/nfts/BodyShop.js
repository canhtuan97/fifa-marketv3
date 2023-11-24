import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { buyCard } from "./../../web3/shop.mjs";
import meta from "./../../context/Provider";
import Axios from "axios";
import BOTTOM_CARD from "./../../assets/icons/botomcard.png";

import { HeaderShop } from "./HeaderShop";
import DIAMOND from "./../../assets/shop-1/diamond.png";
import GOLD from "./../../assets/shop-1/gold.png";
import PLATIUM from "./../../assets/shop-1/platium.png";
import TOP10 from "./../../assets/shop-1/10.png";
import TOP20 from "./../../assets/shop-1/20.png";
import TOP30 from "./../../assets/shop-1/30.png";
import TOP50 from "./../../assets/shop-1/50.png";
import TOP100 from "./../../assets/shop-1/100.png";
import TOP200 from "./../../assets/shop-1/200.png";
import ALL from "./../../assets/shop-1/all.png";
import $ from "jquery";
import "./select";

import { API_LINK } from "./../../const/const";

import { ModalBuy } from "./modal";

const MAP_DATA = {
  top10: { key: 10, name: "TOP 10", img: TOP10 },
  top20: { key: 20, name: "TOP 20", img: TOP20 },
  top30: { key: 30, name: "TOP 30", img: TOP30 },
  top50: { key: 50, name: "TOP 50", img: TOP50 },
  top100: { key: 100, name: "TOP 100", img: TOP100 },
  top200: { key: 200, name: "TOP 200", img: TOP200 },
  top300: { key: 300, name: "ALL", img: ALL },
  top2: { key: 2, name: "DIAMOND", img: DIAMOND },
  top0: { key: 0, name: "GOLD", img: GOLD },
  top1: { key: 1, name: "PLATIUM", img: PLATIUM },
};

const Wrapper = styled.div`
  min-height: 750px;
  @media (max-width: 768px) {
    min-height: 140vh;
  }
`;

const Title = styled.div`
  font: normal normal bold 15px Poppins;
  color: #86c540;
  text-align: center;
`;

const Content = styled.div`
  font: normal normal normal 12px Poppins;
  white-space: nowrap;
  @media (max-width: 768px) {
    font: normal normal normal 8px Poppins;
  }
`;

const WrapperPrice = styled.div`
  font: normal normal normal 14px Poppins;
  white-space: nowrap;
  @media (max-width: 768px) {
    font: normal normal normal 12px Poppins;
  }
`;

const WrapperBox = styled.div`
  position: relative;
  // height: 210px;
  padding: 10px;
  background-color: rgba(11, 31, 79, 0.6);
  border-radius: 10px;
`;

const ResponsiveImage = styled.img`
  width: 90%;
  height: auto;
  margin: 0px auto;
`;

const ResponsiveIcon = styled.img`
  width: 50%;
  height: 20px;
`;

const BodyShop = () => {
  const _meta = useContext(meta);
  const [isBuying, setIsBuying] = useState(false);
  const [dataBuy, setDataBuy] = useState({});
  const [claim, setClaim] = useState(false);
  const [claimItem, setClaimItem] = useState({});
  const [isLoading, setIsLoading] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (_meta.address) {
      setAddress(_meta.address);
    }
  }, [_meta.address]);

  useEffect(() => {
    async function getItems() {
      try {
        await Axios.get(API_LINK + "v2/list-box/" + _meta.address, {
          headers: {},
        })
          .then((e) => {
            if (e.data && e.data.data) {
              let itemr = [];
              for (const property in e.data.data) {
                const person = new Object();
                person.top = property;
                person.amount = e.data.data[property];
                person.account = _meta.address;
                if (e.data.data[property] > 0) {
                  itemr.push(person);
                }
              }
              setItems(itemr);
            }
          })
          .catch((err) => console.log("Err: ", err));
      } catch (e) {
        console.log(e);
      }
      let claimd = null;
      try {
        await Axios.get(API_LINK + "v2/box/check-miss/" + _meta.address, {
          headers: {},
        })
          .then((e) => {
            if (e.data && e.data.msg) {
              claimd = e.data.msg;
            }
          })
          .catch((err) => console.log("Err: ", err));
      } catch (e) {
        console.log(e);
      }
      if (claimd && claimd.cardId) {
        setClaim(true);
        setClaimItem(claimd);
      }
    }

    if (address) {
      getItems();
    }
  }, [address]);

  async function load() {
    try {
      await Axios.get(API_LINK + "v2/list-box/" + _meta.address, {
        headers: {},
      })
        .then((e) => {
          if (e.data && e.data.data) {
            let itemr = [];
            for (const property in e.data.data) {
              const person = new Object();
              person.top = property;
              person.amount = e.data.data[property];
              person.account = _meta.address;
              if (e.data.data[property] > 0) {
                itemr.push(person);
              }
            }
            setItems(itemr);
          }
        })
        .catch((err) => console.log("Err: ", err));
    } catch (e) {
      console.log(e);
    }
    let claimd = null;
    try {
      await Axios.get(API_LINK + "v2/box/check-miss/" + _meta.address, {
        headers: {},
      })
        .then((e) => {
          if (e.data && e.data.msg) {
            claimd = e.data.msg;
          }
        })
        .catch((err) => console.log("Err: ", err));
    } catch (e) {
      console.log(e);
    }
    if (claimd && claimd.cardId) {
      setClaim(true);
      setClaimItem(claimd);
    } else {
      setClaim(false);
      setClaimItem({});
    }
  }

  const handleBuy = async (_dataBuy) => {
    setIsBuying(true);
    setDataBuy(_dataBuy);
  };

  const handleClose = () => {
    setIsBuying(false);
  };

  return (
    <Wrapper>
      <HeaderShop />
      <div className="container">
        <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gy-4">
          {items
            ? items.map((item) => (
                <div className="col zoomd" key={item.top}>
                  <WrapperBox
                    onClick={(e) =>
                      handleBuy({
                        key: item.top,
                        price: 999,
                        item: item,
                        opend: true,
                        openSO: claim,
                        claimSO: claimItem,
                      })
                    }
                  >
                    <div>
                      <ResponsiveImage
                        className="hover-item"
                        src={MAP_DATA[item.top]["img"]}
                      />
                    </div>
                    <img
                      style={{
                        width: "30%",
                        marginTop: "-23px",
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                      }}
                      src={BOTTOM_CARD}
                      alt="BigCo Inc. logo"
                    />
                    <p
                      style={{
                        position: "absolute",
                        bottom: "-8px",
                        right: "9px",
                        fontSize: "13px",
                      }}
                    >
                      {item.amount}{" "}
                    </p>
                  </WrapperBox>
                </div>
              ))
            : ""}
        </div>
      </div>

      <ModalBuy
        isOpen={isBuying}
        dataBuy={dataBuy}
        onClose={(e) => handleClose()}
        load={(e) => load()}
        isClaimc={claim}
        isClaimcItem={claimItem}
      />
    </Wrapper>
  );
};

export { BodyShop };
