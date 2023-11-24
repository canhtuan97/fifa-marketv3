import { style } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import styled from "styled-components";
import "./modal.css";
import ICON_CLOSE from "./../../assets/shop-1/close-circle-sharp.png";
import Axios from "axios";
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

import { claimCard } from "./../../web3/market.mjs";

import DataMeta from "./../../context/Provider";

import { CHAIN_ID } from "./../../const/const";

import { isEmpty } from "lodash";

import { API_LINK, APP_IMAGE_API } from "./../../const/const";

import {
  openNotificationSuccess,
  openNotificationError,
} from "../../components/notification";

import {
  setAnimation,
  setSkins,
  setItemClaim as setItemClaimAni,
  setIsCompleted,
  setTotalRepeat,
} from "src/redux/slices/animation";
import { MAP_ANIMATION_BY_KEY } from "src/const/const";

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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(11,31,79,0.9)",
    borderRadius: "13px",
    border: "none",
    zIndex: "100000000",
  },
};
const Wrapper = styled.div`
  width: 400px;
  height: 430px;
  @media (max-width: 768px) {
    width: 70vw;
    height: 60vh;
  }
`;
const WrapperSO = styled.div`
  width: 400px;
  height: 180px;
  @media (max-width: 768px) {
    width: 70vw;
    height: 40vh;
  }
`;
const WrapperClaim = styled.div`
  max-width: 800px;
  min-width: 400px;
  min-height: 350px;
  max-height: 500px;
  overflow-y: auto;
  // Simple
  ::-webkit-scrollbar {
    width: 10px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  ::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.9);
  }

  @media (max-width: 768px) {
    width: 70vw;
    min-height: 63vh;
  }
`;
const WrapperBox = styled.div`
  position: relative;
  // height: 210px;
  padding: 10px;
  background-color: rgba(11, 31, 79, 0.6);
  border-radius: 10px;
`;
const Title = styled.div`
  font: normal normal bold 25px Poppins;
  color: #86c540;
  text-align: center;
  @media (max-width: 768px) {
    font: normal normal bold 16px Poppins;
  }
`;

const BtnClose = styled.img`
  &: hover {
    cursor: pointer;
  }
`;

const BtnAddClose = styled.button`
  font: normal normal bold 20px Poppins;
  padding: 3px 10px;
  color: white;
  border-style: none;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  @media (max-width: 768px) {
    font: normal normal bold 18px Poppins;
    padding: 2px 7px;
  }
`;

const ResponsiveImage = styled.img`
  width: 43%;
  height: auto;
  margin: 0px auto;
`;
const ResponsiveImageClaim = styled.img`
  max-height: 82%;
  height: auto;
  margin: 0px auto;
`;

const Content = styled.div`
  font: normal normal bold 14px Poppins;
  color: #86c540;
  white-space: nowrap;
  @media (max-width: 768px) {
    font: normal normal bold 12px Poppins;
  }
`;

const ResponsiveIcon = styled.img`
  width: 5%;
  height: auto;
  @media (max-width: 768px) {
    width: 10%;
  }
`;

const BtnBuy = styled.div`
  background-color: rgba(134, 197, 64, 1);
  padding: 10px 15px;
  border-radius: 4px;
  color: white;
  width: 120px;
  font: normal normal bold 12px Poppins;
  margin: 0px auto;
  text-align: center;
  @media (max-width: 768px) {
    width: 100px;
    font: normal normal bold 10px Poppins;
  }
  &: hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  text-align: center;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  border-radius: 4px;
  @media (max-width: 768px) {
    width: 50%;
  }
`;

function ModalBuy(props) {
  const _meta = useContext(DataMeta);
  const [amount, setAmount] = useState(1);
  const [isBuying, setIsBuying] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [itemClaim, setItemClaim] = useState([]);
  const [itemClaimBox, setItemClaimBox] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(props.isOpen);
  const [modalIsOpenSO, setIsOpenSO] = useState(false);
  const [isOpenClaim, setIsOpenClaim] = useState(false);
  const [isSO, setIsSO] = useState(false);
  const [isOpenAni, setIsOpenAni] = useState(false);
  const [dataBuy, setDataBuy] = useState(props.dataBuy);
  const [itemClaimSO, setItemClaimSO] = useState({});
  const [itemClaimSHOW, setItemClaimSHOW] = useState([]);

  const [maxAmount, setMaxAmount] = useState(0);
  console.log("data buy: ", dataBuy);
  const dispatch = useDispatch();
  const {
    isCompleted,
    skins = [],
    itemClaim: itemClaimAnimation,
  } = useSelector((state) => state.animation);

  // useEffect(() => {
  //   setIsOpen(props.isOpen);
  // }, [props.isOpen]);

  useEffect(() => {
    setDataBuy(props.dataBuy);
    if (props.dataBuy.openSO) {
      setIsOpen(false);
      setIsSO(true);
      setIsOpenSO(props.dataBuy.openSO);
      setItemClaimSO(props.dataBuy.claimSO);
    } else {
      setIsOpen(props.dataBuy.opend);
    }

    setMaxAmount(props.dataBuy.item ? props.dataBuy.item.amount : 1);
  }, [props.dataBuy]);

  useEffect(() => {
    props.load();
    if (!modalIsOpen) {
      setAmount(1);
    }
  }, [modalIsOpen, modalIsOpenSO, isOpenClaim]);

  function closeModal() {
    setIsOpen(false);
    setAmount(1);
    props.onClose();
  }
  function closeModalSO() {
    setIsOpenSO(false);
  }
  function toggleModal() {
    setIsOpenClaim(false);
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const handleBuy = async (e) => {
    try {
      setIsBuying(true);
      let reponseItem = {};

      // const animation = MAP_ANIMATION_BY_KEY[MAP_DATA[dataBuy.key].key];
      // dispatch(setAnimation(animation));
      // dispatch(setTotalRepeat(1));
      // dispatch(setSkins([1, 19]));
      // return;

      if (e == 0 || e == 1 || e == 2) {
        await Axios.post(
          API_LINK + "v2/open-box-vip",
          {
            account: dataBuy.item ? dataBuy.item.account : "",
            top: e,
            amount: amount,
          },
          {
            headers: {
              accept: "application/json",
            },
          }
        )
          .then((e) => {
            if (e && e.data) {
              console.log("e.dataddff", e.data);
              reponseItem = e.data.data;
            }
          })
          .catch((err) => console.log("Err: ", err));

        // setIsOpen(false);
        // props.load();
        // return openNotificationSuccess("top", "Claim Success!", "Check your nft!");
      } else {
        await Axios.post(
          API_LINK + "v2/claim-bundle",
          {
            account: dataBuy.item ? dataBuy.item.account : "",
            top: e,
            amount: amount,
          },
          {
            headers: {
              accept: "application/json",
            },
          }
        )
          .then((e) => {
            if (e && e.data) {
              reponseItem = e.data.data;
            }
          })
          .catch((err) => console.log("Err: ", err));
      }

      if (reponseItem) {
        // setIsOpenAni(true);
        // await renderCraft();

        // await delay(70000);
        // setIsOpenAni(false);
        console.log("reponseItem.cardIds", reponseItem.cardIds);

        if (e == 0 || e == 1 || e == 2) {
          setItemClaimBox(reponseItem);
          setIsOpenClaim(false);

          dispatch(setSkins([]));
          dispatch(setItemClaimAni(null));
          dispatch(setTotalRepeat(amount));
        } else {
          setItemClaim(reponseItem);
          setItemClaimSHOW(reponseItem.cardIds);
          // console.log("reponseItem.cardIds", reponseItem.cardIds);
          setIsOpenClaim(true);
          dispatch(setSkins(reponseItem.cardIds || []));
          dispatch(setItemClaimAni(reponseItem));
        }
        const animation = MAP_ANIMATION_BY_KEY[MAP_DATA[dataBuy.key].key];
        dispatch(setAnimation(animation));

        setIsOpen(false);
      }

      setIsBuying(false);
    } catch (error) {
      setIsBuying(false);
    }
  };

  useEffect(() => {
    if (isCompleted && itemClaimAnimation) {
      setIsOpenClaim(true);
      setItemClaimSHOW(skins);
      setItemClaim(itemClaimAnimation);
      setItemClaimBox(itemClaimAnimation);

      dispatch(setIsCompleted(false));
    }
  }, [isCompleted]);

  const handleClaim = async () => {
    try {
      setIsClaiming(true);
      if (itemClaim) {
        const txi = await claimCard(
          _meta.web3,
          _meta.address,
          itemClaim.cardIds,
          itemClaim.top,
          itemClaim.nonce,
          itemClaim.v,
          itemClaim.r,
          itemClaim.s
        );

        if (txi["status"] === "success") {
          openNotificationSuccess("top", "Claim Success!", "Check your nft!");
        } else {
          openNotificationError("top", "Claim Fail!", "Please check again!");
        }
        setIsClaiming(false);
        setIsOpenClaim(false);
        setIsOpen(false);
        props.load();
      }
    } catch (error) {
      setIsClaiming(false);
      openNotificationError("top", "Claim Fail!", "Please check again!");
    }
  };

  const handleClaimSO = async () => {
    try {
      setIsClaiming(true);
      if (itemClaim) {
        const txi = await claimCard(
          _meta.web3,
          _meta.address,
          itemClaimSO.cardId,
          itemClaimSO.top,
          itemClaimSO.nonceClaim,
          itemClaimSO.v,
          itemClaimSO.r,
          itemClaimSO.s
        );

        if (txi["status"] === "success") {
          openNotificationSuccess("top", "Claim Success!", "Check your nft!");
        } else {
          openNotificationError("top", "Claim Fail!", "Please check again!");
        }
        setIsClaiming(false);
        setIsOpenClaim(false);
        setIsOpen(false);
        props.load();
      }
    } catch (error) {
      setIsClaiming(false);
      openNotificationError("top", "Claim Fail!", "Please check again!");
    }
  };

  // const renderCraft = () => {
  //   return new SpinePlayer("player-container", {
  //     showControls: false,
  //     alpha: true,
  //     backgroundColor: '#00000000', // Magenta player background
  //     animations: ['animation'],
  //     pngUrl:
  //       'https://fifafootball.s3.ap-southeast-1.amazonaws.com/animation/box_gold/god.png',
  //     jsonUrl:
  //       'https://fifafootball.s3.ap-southeast-1.amazonaws.com/animation/box_gold/god.json',
  //     atlasUrl:
  //       'https://fifafootball.s3.ap-southeast-1.amazonaws.com/animation/box_gold/god.atlas',
  //     viewport: {
  //       x: -1,
  //       y: 0,
  //       width: 2000,
  //       height: 2000,
  //       padLeft: "60%",
  //       padRight: "60%",
  //       padTop: "60%",
  //       padBottom: "60%"
  //     },
  //     backgroundColor: "#0b1f4fe6" // Magenta player background
  //   })
  // };

  const handleMin = (e) => {
    if (amount <= 1) return;
    setAmount(amount - 1);
  };

  const handleAdd = (e) => {
    setAmount(amount + 1);
  };

  const handleChange = (e) => {
    if (Number(e.target.value) >= 0) setAmount(Number(e.target.value));
    else return;
  };

  useEffect(() => {
    if (amount > maxAmount) {
      setAmount(maxAmount);
    }
  }, [amount]);

  const handleBuySO = () => {
    setIsOpenSO(false);
    setIsOpenClaim(true);
    setItemClaimSHOW(itemClaimSO.cardId);
  };

  return (
    <div>
      {/* {isOpenAni ? (<div id="player-container" style={{ zIndex: 999999999, marginTop: '-220px' }}  ></div>) : ""} */}
      <Modal
        isOpen={modalIsOpenSO}
        onRequestClose={closeModalSO}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <WrapperSO>
          <div className="container">
            <div className="row">
              <div className="col d-flex justify-content-between px-0">
                <Title>WARNING!</Title>
                <BtnClose
                  className="my-auto"
                  src={ICON_CLOSE}
                  onClick={closeModalSO}
                />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col">
                The opened cards have not been claimed yet. <br />
                Please claim the cards.
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <BtnBuy
                  onClick={(e) =>
                    handleBuySO(
                      !isEmpty(dataBuy) ? MAP_DATA[dataBuy.key]["key"] : ""
                    )
                  }
                >
                  SHOW
                </BtnBuy>
              </div>
            </div>
          </div>
        </WrapperSO>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <Wrapper>
          <div className="container">
            <div className="row">
              <div className="col d-flex justify-content-between px-0">
                <Title>
                  {!isEmpty(dataBuy) ? MAP_DATA[dataBuy.key]["name"] : ""} -{" "}
                  {dataBuy.item ? dataBuy.item.amount : ""}
                  {MAP_DATA[dataBuy.key] &&
                  !["DIAMOND", "GOLD", "PLATIUM"].includes(
                    MAP_DATA[dataBuy.key]["name"]
                  )
                    ? " Cards"
                    : " Boxes"}
                </Title>
                <BtnClose
                  className="my-auto"
                  src={ICON_CLOSE}
                  onClick={closeModal}
                />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col">
                <ResponsiveImage
                  src={!isEmpty(dataBuy) ? MAP_DATA[dataBuy.key]["img"] : ""}
                  alt="img-box"
                />
              </div>
            </div>
            <div className="row pt-3">
              <div className="col d-flex justify-content-center">
                <BtnAddClose onClick={handleMin}>-</BtnAddClose>
                <Input
                  onChange={handleChange}
                  value={amount}
                  type="number"
                  className="mx-2"
                />
                <BtnAddClose onClick={handleAdd}>+</BtnAddClose>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                {isBuying ? (
                  <BtnBuy>
                    <div className="my-auto d-flex align-items-center">
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="my-auto"> Opening...</span>
                    </div>
                  </BtnBuy>
                ) : _meta.isConnected && _meta.chainId === CHAIN_ID ? (
                  <BtnBuy
                    onClick={(e) =>
                      handleBuy(
                        !isEmpty(dataBuy) ? MAP_DATA[dataBuy.key]["key"] : ""
                      )
                    }
                  >
                    OPEN
                  </BtnBuy>
                ) : (
                  <BtnBuy style={{ opacity: 0.7 }}>OPEN</BtnBuy>
                )}
              </div>
            </div>
          </div>
        </Wrapper>
      </Modal>
      <Modal
        isOpen={isOpenClaim}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}
        ariaHideApp={false}
      >
        <WrapperClaim>
          <div className="container">
            <div className="row">
              <div className="col d-flex justify-content-between px-0">
                <Title>Congratulations!</Title>
                <BtnClose
                  className="my-auto"
                  src={ICON_CLOSE}
                  onClick={toggleModal}
                />
              </div>
            </div>
            <br />
            {itemClaimSHOW && itemClaimSHOW.length == 1 ? (
              <div className="row pt-3">
                <div className="col">
                  <ResponsiveImageClaim
                    className="hover-item"
                    src={
                      APP_IMAGE_API +
                      itemClaimSHOW[0] +
                      ".png"
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 gy-4">
                {itemClaimSHOW
                  ? itemClaimSHOW.map((item, index) => (
                      <div className="col" key={index}>
                        <ResponsiveImageClaim
                          className="hover-item"
                          src={
                            APP_IMAGE_API +
                            item +
                            ".png"
                          }
                        />
                      </div>
                    ))
                  : ""}
              </div>
            )}
            <div
              className="row"
              style={
                itemClaimSHOW && itemClaimSHOW.length == 1
                  ? { marginTop: "-34px" }
                  : {}
              }
            >
              <div className="col">
                {isClaiming ? (
                  <BtnBuy>
                    <div className="my-auto d-flex align-items-center">
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="my-auto"> Claiming...</span>
                    </div>
                  </BtnBuy>
                ) : _meta.isConnected && _meta.chainId === CHAIN_ID ? (
                  isSO ? (
                    <BtnBuy onClick={(e) => handleClaimSO()}>CLAIM </BtnBuy>
                  ) : (
                    <BtnBuy onClick={(e) => handleClaim()}>CLAIM </BtnBuy>
                  )
                ) : (
                  <BtnBuy style={{ opacity: 0.7 }}>CLAIM</BtnBuy>
                )}
              </div>
            </div>
          </div>
        </WrapperClaim>
      </Modal>
    </div>
  );
}

export { ModalBuy };
