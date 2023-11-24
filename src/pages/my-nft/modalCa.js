import { style } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import "./modalCa.css";
import ICON_CLOSE from "./../../assets/shop-1/close-circle-sharp.png";
import ICON_FF from "./../../assets/shop/icon-token-fifa-mini.png";
import DataMeta from "./../../context/Provider";
import { CHAIN_ID, APP_IMAGE_API } from "./../../const/const";
import { buyCard } from "./../../web3/shop.mjs";
import { isEmpty } from "lodash";
import { buyNFT, getCurrentPrice, getListTokenIds, cancelSellNFT } from "./../../web3/market.mjs";
import BigNumber from "bignumber.js";

import {
  openNotificationSuccess,
  openNotificationError,
} from "../../components/notification";

const mapCards = {  "1":"L. Messi", "2":"Mbappe", "3":"H. Kane", "4":"R. Lewandowski", "5":"C. Ronaldo", "6":"K . Bruyne", "7":"Son Heung Min", "8":"E. Haaland", "9":"M. Salah", "10":"K. Benzema", "11":"L. Sane", "12":"N. Kante", "13":"G. Kondogbia", "14":"L. Suarez", "15":"Z. Ibrahimovic", "16":"L. Martinez", "17":"Marquinhos", "18":"Virgil Van Dijk", "19":"Neymar", "20":"J. Kimmich", "21":"L. Goretzka", "22":"M. Neuer", "23":"P. Dybala", "24":"F. Chiesa", "25":"B. Fernandes", "26":"P. Pogba", "27":"T. Kroos", "28":"L. Modric", "29":"G. Bale", "30":"Casemiro", "31":"K. Coman", "32":"A. Davies", "33":"M. Locatelli", "34":"D. Vlahovic", "35":"M.Rashford", "36":"H. Maguire", "37":"Fernandinho", "38":"P. Foden", "39":"Gundogan", "40":"Bernardo", "41":"Lukaku", "42":"E. Mendy", "43":"M. Mout", "44":"Thiago Silva", "45":"Sergio Ramos", "46":"A. Arnold", "47":"Henderson", "48":"S. Mane", "49":"D. Kulusevski", "50":"J. Oblak", "51":"C. Romero", "52":"E. Hojbjerg", "53":"M. Llorente", "54":"R. De Paul", "55":"Koke", "56":"T. Soucek", "57":"D. Rice", "58":"A. Yarmolenko", "59":"V. Coufall", "60":"T. Hernandez", "61":"S. Kjaer", "62":"F. Kessie", "63":"A. Rebic", "64":"M. Odegaard", "65":"G. Xhaka", "66":"H. Mkhitaryan", "67":"L. Spinazzola", "68":"Rui Patricio", "69":"S. Oliveira", "70":"Roger Ibanez", "71":"H. Calhanoglu", "72":"N. Barella", "73":"M. Skriniar", "74":"S. De Vrij", "75":"E. Dzeko", "76":"A. Sanchez", "77":"Y. Tielemans", "78":"J. Vardy", "79":"K. Schmeichel", "80":"W. Fofana", "81":"L. Insigne", "82":"H. Lozano", "83":"D. Malen", "84":"G. Dilorenzo", "85":"D. Mertens", "86":"J. Grealish", "87":"P. Alcacer", "88":"G. Moreno", "89":"P. Estupinan", "90":"D. Parejo", "91":"E. Capoue", "92":"G. Donnarumma", "93":"Ter Stegen", "94":"Busquets", "95":"Pedri", "96":"Jordi Alba", "97":"F. De Jong", "98":"M. Reus", "99":"M. Hummels", "100":"T. Hazard", "101":"M. DeLight", "102":"R. Mahrez", "103":"R. Sterling", "104":"G. Jesus", "105":"J. Cancelo", "106":"J. Stone", "107":"Ederson", "108":"K. Walker", "109":"N. Ake", "110":"Zinchenko", "111":"A. Telles", "112":"Fred", "113":"N. Matic", "114":"J. Sancho", "115":"E. Cavani", "116":"J.Lingard", "117":"D. Degea", "118":"A. Martial", "119":"L. Shaw", "120":"V. Lindelof", "121":"A. Sandro", "122":"Danilo", "123":"L. Bonucci", "124":"G. Chiellini", "125":"A. Rabiot", "126":"W. Mckennie", "127":"F.Bernardeschi", "128":"J. Cuadrado", "129":"W. Szczesny", "130":"A. Morata", "131":"D. Upamecano", "132":"L. Hernandez", "133":"S. Gnabry", "134":"T. Muller", "135":"C. Tolisso", "136":"M. Sabitzer", "137":"J. Musiala", "138":"B. Parvard", "139":"J. Draxler", "140":"A. Dimaria", "141":"A. Herrera", "142":"M. Icardi", "143":"Wijnaldum", "144":"Kimpembe", "145":"Kurzawa", "146":"Aguero", "147":"Thilo Kehrer", "148":"Dembele", "149":"Coutinho", "150":"Depay", "151":"Fati", "152":"Aguero", "153":"Pique", "154":"Lenglet", "155":"S. Umtiti", "156":"Ricard Puig", "157":"Mingueza", "158":"Marcelo", "159":"E. Hazard", "160":"T.Courtois", "161":"Camavinga", "162":"D. Alaba", "163":"Isco", "164":"M. Assensio", "165":"L. Vazquez", "166":"L. Jovic", "167":"D. Cebaloss", "168":"R. Loftus-Cheek", "169":"M. Kovacic", "170":"K. Havertz", "171":"Azpilicueta", "172":"A. Rudiger", "173":"T. Werner", "174":"Saul", "175":"B. Chilwell", "176":"A. Christensen", "177":"R. James", "178":"Fabinho", "179":"D. Jota", "180":"R. Firmino", "181":"A. Becker", "182":"Thiago", "183":"Robertson", "184":"N. Keita", "185":"Chamberlain", "186":"J. Matip", "187":"F. Origi", "188":"J. Felix", "189":"J. Gimenez", "190":"Felipe", "191":"T. Lemar", "192":"Renan Lodi", "193":"A. Griezmann", "194":"S. Savic", "195":"Y. Carrasco", "196":"A. Correa", "197":"B. Saka", "198":"Smith Rowe", "199":"W. Ndidi", "200":"A. Lacazette", "201":"N. Pepe", "202":"G. Martinelli", "203":"B. Leno", "204":"T. Partey", "205":"C. Soyuncu", "206":"M. Albrighton", "207":"P. Daka", "208":"J. Evans", "209":"A. Lookman", "210":"J. Maddison", "211":"T. Castagne", "212":"H. Barnes", "213":"K. Iheanacho", "214":"J. Justin", "215":"V. Oshimen", "216":"Alex Meret", "217":"K. Koulibaly", "218":"D. Ospina", "219":"Fabian Ruiz", "220":"A. Tuanzebe", "221":"P. Zielinski", "222":"Elif Elmas", "223":"A. Zanoli", "224":"Mario Rui", "225":"A. Anguissa", "226":"A. Danjuma", "227":"Y. Pino", "228":"A. Moreno", "229":"G. Lo Celso", "230":"Raul Albiol", "231":"G. Rulli", "232":"P. Torres", "233":"F. Coquelin", "234":"S. Chukwueze", "235":"J. Foyth", "236":"J. Correa", "237":"S. Handanovic", "238":"A. Vidal", "239":"A. Bastoni", "240":"M. Darmian", "241":"M. Brozovic", "242":"R. Gosens", "243":"D. Dumfries", "244":"L. Pellegrini", "245":"C. Smalling", "246":"G. Mancini", "247":"T. Abraham", "248":"N. Zaniolo", "249":"EL. Shaarawy", "250":"Maitland-Niles", "251":"C. Voltapo", "252":"Matias Vina", "253":"E. Shomurodov", "254":"E. Nketiah", "255":"B. White", "256":"N. Tavares", "257":"Brahim Diaz", "258":"M. Maignan", "259":"O. Giroud", "260":"I. Bennacer", "261":"T. Bakayoko", "262":"A. Florenzi", "263":"A. Romagnoli", "264":"S. Tonali", "265":"Rafael Leao", "266":"Tomori", "267":"A. Areola", "268":"K. Zouma", "269":"I. Diop", "270":"P. Fornals", "271":"M. Atonio", "272":"M. Lazini", "273":"J. Bowen", "274":"M. Noble", "275":"A. Cresswell", "276":"S. Benrahma", "277":"C. Dawson", "278":"S. Reguilon", "279":"S. Bergwijn", "280":"Emerson", "281":"R. Bentancur", "282":"B. Davies", "283":"L. Moura", "284":"H. Lloris", "285":"E. Dier", "286":"R. Sessegnon", "287":"M. Doherty", "288":"Emre Can", "289":"J. Brandt", "290":"Dahoud", "291":"Giovani Reyna", "292":"A. Witsel", "293":"A. Knauff", "294":"Marius Wolf", "295":"Robias Raschl", "296":"Steffen Tigges", "297":"Moukoko", "298":"K. Tierney", "299":"M. Elneny", "300":"Tomiyasu" };


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(11,31,79,0.9)",
    borderRadius: '13px',
    border: 'none',
  },
};
const Wrapper = styled.div`
  width: 400px;
  height: 400px;
  @media (max-width: 768px) {
    width: 70vw;
    height: 60vh;
  }
  overflow: hidden;
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
  width: 5%;
  height: 60%;
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
  width: 35%;
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
  width: 110px;
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
function ModalCa(props) {
  const _meta = useContext(DataMeta);
  const [amount, setAmount] = useState(1);
  const [isBuying, setIsBuying] = useState(false);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(props.isOpen);
  const [dataBuy, setDataBuy] = useState(props.dataBuy);
  const [dataRoi, setDataRoi] = useState(props.dataRoi);
  const [price, setPrice] = useState(props.price);
  const [urlImage, setUrlImage] = useState("");
  const [item, setItem] = useState(props.dataBuy.item);
  const [isMyNft, setIsMyNft] = useState(false);

  // useEffect(() => {
  //   setIsOpen(props.isOpen);
  // }, [props.isOpen]);

  useEffect(() => {
    setDataBuy(props.dataBuy);
    setItem(props.dataBuy.item);
    try {
      setUrlImage(APP_IMAGE_API + props.dataBuy.item.category[0] + '.png');
    } catch (e) {

    }
    setIsOpen(props.dataBuy.opend);
  }, [props.dataBuy]);

  useEffect(() => {
    setDataRoi(props.dataRoi);
  }, [props.dataBuy]);

  useEffect(() => {
    setDataRoi(props.dataRoi);
    async function getPrices() {
      try {
        const txi = await getCurrentPrice(
          _meta.web3,
          _meta.address,
          item.auctionId
        );
        setPrice(txi);
      } catch (e) {

      }

    }
    getPrices();
  }, [item]);


  useEffect(() => {
    if (modalIsOpen) {
      async function getItems() {
        try {
          const txi = await getListTokenIds(
            _meta.web3,
            _meta.address,
          );
          if (item && item.ids[0] && txi.includes(item.ids[0])) {
            setIsMyNft(true);
          }
        } catch (error) {
          console.log("err", error);
        }
      }
      getItems();
    } else {
      setIsMyNft(false);
    }


  }, [modalIsOpen]);


  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    props.onClose();
  }

  const cancelNFTct = async () => {
    try {
      setIsBuying(true);
      const txi = await cancelSellNFT(
        _meta.web3,
        _meta.address,
        item.auctionId);
      if (txi["status"] === "success") {
        openNotificationSuccess("top", "Cancel sell Success!", "");
      } else {
        openNotificationError("top", "Cancel sell Fail!", "Please check again!");
      }

      setIsBuying(false);
      setIsOpen(false);
      props.load();

    } catch (error) {
      openNotificationError("top", "Cancel sell Fail!", "Please check again!");
      setIsBuying(false);
    }
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
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
                  #{item ? item.ids[0] : ""}. {item ? (mapCards[item.category[0]]) : ""}
                </Title>
                <BtnClose
                  className="my-auto"
                  src=
                  {ICON_CLOSE}

                  onClick={closeModal}

                />
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-between px-0 id-sm">
                <p><span className="roin">Seller:</span>
                  <a style={{ color: 'white' }} href={"https://bscscan.com/address/" + (item ? item.seller : "")} target="_blank">#{item ? item.seller : ""}</a>
                </p>

              </div>
            </div>
            <div className="row" style={{ marginTop: "-15px" }}>
              <div className="col d-flex justify-content-between px-0 id-sm">
                {dataRoi}
              </div>
            </div>

            <div className="row pt-3" style={{ marginTop: "-15px" }}>
              <div className="col">
                <ResponsiveImage
                  src={urlImage}
                  alt="img-box"
                />
              </div>
            </div>
            <br />
            <div className="row" style={{ marginTop: "-11px" }}>
              <div className="col d-flex justify-content-center">
                <ResponsiveIcon src={ICON_FF} className="me-1" />
                <Content>{(price / 1e18).toString()}</Content>

              </div>
            </div>
            <div className="row mt-3" style={{ marginTop: "-15px" }}>
              <div className="col">

                {isBuying ? (
                  <BtnBuy>
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span> Cancel...</span>
                    </>
                  </BtnBuy>
                ) : _meta.isConnected && _meta.chainId === CHAIN_ID ? (
                  <BtnBuy onClick={(e) => cancelNFTct()}>CANCEL&nbsp;SELL</BtnBuy>
                ) : (
                  <BtnBuy style={{ opacity: 0.7 }}>BUY NOW</BtnBuy>
                )
                }
              </div>
            </div>
          </div>
        </Wrapper>
      </Modal>
    </div>
  );
}


export { ModalCa };
