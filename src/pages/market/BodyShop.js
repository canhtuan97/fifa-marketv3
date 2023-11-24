import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { buyCard } from "./../../web3/shop.mjs";
import meta from "./../../context/Provider";
import { HeaderShop } from "./HeaderShop";
import "./body.css";
import Axios from "axios";
import { ModalBuy } from "./modal";
import { getCurrentPrice } from "./../../web3/market.mjs";
import { API_LINK, APP_IMAGE_API } from "./../../const/const";
import "./select";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import web3 from "web3";

const mapCardFull = {
  "l. messi": 1,
  mbappe: 2,
  "h. kane": 3,
  "r. lewandowski": 4,
  "c. ronaldo": 5,
  "k . bruyne": 6,
  "son heung min": 7,
  "e. haaland": 8,
  "m. salah": 9,
  "k. benzema": 10,
  "l. sane": 11,
  "n. kante": 12,
  "g. kondogbia": 13,
  "l. suarez": 14,
  "z. ibrahimovic": 15,
  "l. martinez": 16,
  marquinhos: 17,
  "virgil van dijk": 18,
  neymar: 19,
  "j. kimmich": 20,
  "l. goretzka": 21,
  "m. neuer": 22,
  "p. dybala": 23,
  "f. chiesa": 24,
  "b. fernandes": 25,
  "p. pogba": 26,
  "t. kroos": 27,
  "l. modric": 28,
  "g. bale": 29,
  casemiro: 30,
  "k. coman": 31,
  "a. davies": 32,
  "m. locatelli": 33,
  "d. vlahovic": 34,
  "m.rashford": 35,
  "h. maguire": 36,
  fernandinho: 37,
  "p. foden": 38,
  gundogan: 39,
  bernardo: 40,
  lukaku: 41,
  "e. mendy": 42,
  "m. mout": 43,
  "thiago silva": 44,
  "sergio ramos": 45,
  "a. arnold": 46,
  henderson: 47,
  "s. mane": 48,
  "d. kulusevski": 49,
  "j. oblak": 50,
  "c. romero": 51,
  "e. hojbjerg": 52,
  "m. llorente": 53,
  "r. de paul": 54,
  koke: 55,
  "t. soucek": 56,
  "d. rice": 57,
  "a. yarmolenko": 58,
  "v. coufall": 59,
  "t. hernandez": 60,
  "s. kjaer": 61,
  "f. kessie": 62,
  "a. rebic": 63,
  "m. odegaard": 64,
  "g. xhaka": 65,
  "h. mkhitaryan": 66,
  "l. spinazzola": 67,
  "rui patricio": 68,
  "s. oliveira": 69,
  "roger ibanez": 70,
  "h. calhanoglu": 71,
  "n. barella": 72,
  "m. skriniar": 73,
  "s. de vrij": 74,
  "e. dzeko": 75,
  "a. sanchez": 76,
  "y. tielemans": 77,
  "j. vardy": 78,
  "k. schmeichel": 79,
  "w. fofana": 80,
  "l. insigne": 81,
  "h. lozano": 82,
  "d. malen": 83,
  "g. dilorenzo": 84,
  "d. mertens": 85,
  "j. grealish": 86,
  "p. alcacer": 87,
  "g. moreno": 88,
  "p. estupinan": 89,
  "d. parejo": 90,
  "e. capoue": 91,
  "g. donnarumma": 92,
  "ter stegen": 93,
  busquets: 94,
  pedri: 95,
  "jordi alba": 96,
  "f. de jong": 97,
  "m. reus": 98,
  "m. hummels": 99,
  "t. hazard": 100,
  "m. delight": 101,
  "r. mahrez": 102,
  "r. sterling": 103,
  "g. jesus": 104,
  "j. cancelo": 105,
  "j. stone": 106,
  ederson: 107,
  "k. walker": 108,
  "n. ake": 109,
  zinchenko: 110,
  "a. telles": 111,
  fred: 112,
  "n. matic": 113,
  "j. sancho": 114,
  "e. cavani": 115,
  "j.lingard": 116,
  "d. degea": 117,
  "a. martial": 118,
  "l. shaw": 119,
  "v. lindelof": 120,
  "a. sandro": 121,
  danilo: 122,
  "l. bonucci": 123,
  "g. chiellini": 124,
  "a. rabiot": 125,
  "w. mckennie": 126,
  "f.bernardeschi": 127,
  "j. cuadrado": 128,
  "w. szczesny": 129,
  "a. morata": 130,
  "d. upamecano": 131,
  "l. hernandez": 132,
  "s. gnabry": 133,
  "t. muller": 134,
  "c. tolisso": 135,
  "m. sabitzer": 136,
  "j. musiala": 137,
  "b. parvard": 138,
  "j. draxler": 139,
  "a. dimaria": 140,
  "a. herrera": 141,
  "m. icardi": 142,
  wijnaldum: 143,
  kimpembe: 144,
  kurzawa: 145,
  aguero: 146,
  "thilo kehrer": 147,
  dembele: 148,
  coutinho: 149,
  depay: 150,
  fati: 151,
  aguero: 152,
  pique: 153,
  lenglet: 154,
  "s. umtiti": 155,
  "ricard puig": 156,
  mingueza: 157,
  marcelo: 158,
  "e. hazard": 159,
  "t.courtois": 160,
  camavinga: 161,
  "d. alaba": 162,
  isco: 163,
  "m. assensio": 164,
  "l. vazquez": 165,
  "l. jovic": 166,
  "d. cebaloss": 167,
  "r. loftus-cheek": 168,
  "m. kovacic": 169,
  "k. havertz": 170,
  azpilicueta: 171,
  "a. rudiger": 172,
  "t. werner": 173,
  saul: 174,
  "b. chilwell": 175,
  "a. christensen": 176,
  "r. james": 177,
  fabinho: 178,
  "d. jota": 179,
  "r. firmino": 180,
  "a. becker": 181,
  thiago: 182,
  robertson: 183,
  "n. keita": 184,
  chamberlain: 185,
  "j. matip": 186,
  "f. origi": 187,
  "j. felix": 188,
  "j. gimenez": 189,
  felipe: 190,
  "t. lemar": 191,
  "renan lodi": 192,
  "a. griezmann": 193,
  "s. savic": 194,
  "y. carrasco": 195,
  "a. correa": 196,
  "b. saka": 197,
  "smith rowe": 198,
  "w. ndidi": 199,
  "a. lacazette": 200,
  "n. pepe": 201,
  "g. martinelli": 202,
  "b. leno": 203,
  "t. partey": 204,
  "c. soyuncu": 205,
  "m. albrighton": 206,
  "p. daka": 207,
  "j. evans": 208,
  "a. lookman": 209,
  "j. maddison": 210,
  "t. castagne": 211,
  "h. barnes": 212,
  "k. iheanacho": 213,
  "j. justin": 214,
  "v. oshimen": 215,
  "alex meret": 216,
  "k. koulibaly": 217,
  "d. ospina": 218,
  "fabian ruiz": 219,
  "a. tuanzebe": 220,
  "p. zielinski": 221,
  "elif elmas": 222,
  "a. zanoli": 223,
  "mario rui": 224,
  "a. anguissa": 225,
  "a. danjuma": 226,
  "y. pino": 227,
  "a. moreno": 228,
  "g. lo celso": 229,
  "raul albiol": 230,
  "g. rulli": 231,
  "p. torres": 232,
  "f. coquelin": 233,
  "s. chukwueze": 234,
  "j. foyth": 235,
  "j. correa": 236,
  "s. handanovic": 237,
  "a. vidal": 238,
  "a. bastoni": 239,
  "m. darmian": 240,
  "m. brozovic": 241,
  "r. gosens": 242,
  "d. dumfries": 243,
  "l. pellegrini": 244,
  "c. smalling": 245,
  "g. mancini": 246,
  "t. abraham": 247,
  "n. zaniolo": 248,
  "el. shaarawy": 249,
  "maitland-niles": 250,
  "c. voltapo": 251,
  "matias vina": 252,
  "e. shomurodov": 253,
  "e. nketiah": 254,
  "b. white": 255,
  "n. tavares": 256,
  "brahim diaz": 257,
  "m. maignan": 258,
  "o. giroud": 259,
  "i. bennacer": 260,
  "t. bakayoko": 261,
  "a. florenzi": 262,
  "a. romagnoli": 263,
  "s. tonali": 264,
  "rafael leao": 265,
  tomori: 266,
  "a. areola": 267,
  "k. zouma": 268,
  "i. diop": 269,
  "p. fornals": 270,
  "m. atonio": 271,
  "m. lazini": 272,
  "j. bowen": 273,
  "m. noble": 274,
  "a. cresswell": 275,
  "s. benrahma": 276,
  "c. dawson": 277,
  "s. reguilon": 278,
  "s. bergwijn": 279,
  emerson: 280,
  "r. bentancur": 281,
  "b. davies": 282,
  "l. moura": 283,
  "h. lloris": 284,
  "e. dier": 285,
  "r. sessegnon": 286,
  "m. doherty": 287,
  "emre can": 288,
  "j. brandt": 289,
  dahoud: 290,
  "giovani reyna": 291,
  "a. witsel": 292,
  "a. knauff": 293,
  "marius wolf": 294,
  "robias raschl": 295,
  "steffen tigges": 296,
  moukoko: 297,
  "k. tierney": 298,
  "m. elneny": 299,
  tomiyasu: 300,
};

const allIDs = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
  43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61,
  62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
  115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
  130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144,
  145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
  160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
  175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189,
  190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204,
  205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219,
  220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234,
  235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249,
  250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264,
  265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279,
  280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294,
  295, 296, 297, 298, 299, 300, 301,
];

const MAP_TEAM = {
  PSG: [1, 2, 17, 19, 45, 92, 139, 140, 141, 142, 143, 144, 145, 146, 147],
  TOT: [3, 7, 49, 51, 52, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287],
  "Bayern Munich": [
    4, 11, 20, 21, 22, 31, 32, 131, 132, 133, 134, 135, 136, 137, 138,
  ],
  MU: [5, 25, 26, 35, 36, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
  MC: [6, 37, 38, 39, 40, 86, 102, 103, 104, 105, 106, 107, 108, 109, 110],
  DORTMUN: [
    8, 83, 98, 99, 100, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297,
  ],
  LIV: [9, 18, 46, 47, 48, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187],
  REAL: [10, 27, 28, 29, 30, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167],
  Chelsea: [
    12, 41, 42, 43, 44, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177,
  ],
  ATM: [13, 14, 50, 53, 54, 55, 188, 189, 190, 191, 192, 193, 194, 195, 196],
  Milan: [15, 60, 61, 62, 63, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266],
  Inter: [16, 71, 72, 73, 74, 75, 76, 236, 237, 238, 239, 240, 241, 242, 243],
  JUV: [23, 24, 33, 34, 101, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130],
  "West Ham": [
    56, 57, 58, 59, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277,
  ],
  ARS: [
    64, 65, 197, 198, 200, 201, 202, 203, 204, 254, 255, 256, 298, 299, 300,
  ],
  ROMA: [66, 67, 68, 69, 70, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253],
  Leicester: [
    77, 78, 79, 80, 199, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214,
  ],
  Napoli: [
    81, 82, 84, 85, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225,
  ],
  "Villar Real": [
    87, 88, 89, 90, 91, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235,
  ],
  BAR: [93, 94, 95, 96, 97, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157],
};

const topOptions = [
  { value: 300, label: "All" },
  { value: 10, label: "Top 10" },
  { value: 20, label: "Top 20" },
  { value: 30, label: "Top 30" },
  { value: 50, label: "Top 50" },
  { value: 100, label: "Top 100" },
  { value: 200, label: "Top 200" },
];

const teamOptions = [
  { value: "all", label: "All" },
  { value: "PSG", label: "PSG" },
  { value: "TOT", label: "TOT" },
  { value: "Bayern Munich", label: "Bayern Munich" },
  { value: "MU", label: "MU" },
  { value: "MC", label: "MC" },
  { value: "DORTMUN", label: "DORTMUN" },
  { value: "LIV", label: "LIV" },
  { value: "REAL", label: "REAL" },
  { value: "Chelsea", label: "Chelsea" },
  { value: "ATM", label: "ATM" },
  { value: "Milan", label: "Milan" },
  { value: "Inter", label: "Inter" },
  { value: "JUV", label: "JUV" },
  { value: "West Ham", label: "West Ham" },
  { value: "ARS", label: "ARS" },
  { value: "ROMA", label: "ROMA" },
  { value: "Leicester", label: "Leicester" },
  { value: "Napoli", label: "Napoli" },
  { value: "Villar Real", label: "Villar Real" },
  { value: "BAR", label: "BAR" },
];

const softOptions = [
  { value: "Latest", label: "Latest" },
  { value: "CurrentPriceAsc", label: "Price Asc" },
  { value: "CurrentPriceDesc", label: "Price Desc" },
];

const Wrapper = styled.div`
  min-height: 750px;
  @media (max-width: 768px) {
    min-height: 140vh;
  }
`;

function Rois(data) {
  const [roi, setRoi] = useState(0);
  const day = 7;
  const urlInfoNft = API_LINK + "v1/info-nft/" + data.data;
  function getDay(days) {
    if (days > 1 && days < 10) {
      return 7;
    } else if (days > 10 && days < 21) {
      return 14;
    } else if (days > 20 && days < 31) {
      return 14;
    } else if (days > 30 && days < 51) {
      return 21;
    } else if (days > 50 && days < 101) {
      return 21;
    } else if (days > 100 && days < 201) {
      return 14;
    } else if (days > 200) {
      return 7;
    } else {
      return 7;
    }
  }
  async function getItem() {
    try {
      await Axios.get(urlInfoNft, {
        headers: {},
      })
        .then((e) => {
          setRoi(e.data.nft.roi);
        })
        .catch((err) => console.log("Err: ", err));
    } catch (e) {
      console.log(e);
    }
  }
  getItem();
  return (
    <p className="roinp">
      <span className="roin">ROI:</span>
      {roi}
      <span className="fifan">FIFAC</span>/{getDay(data.category)}D
    </p>
  );
}

function getDayC(days) {
  if (days > 1 && days < 10) {
    return 7;
  } else if (days > 10 && days < 21) {
    return 14;
  } else if (days > 20 && days < 31) {
    return 14;
  } else if (days > 30 && days < 51) {
    return 21;
  } else if (days > 50 && days < 101) {
    return 21;
  } else if (days > 100 && days < 201) {
    return 14;
  } else if (days > 200) {
    return 7;
  } else {
    return 7;
  }
}

function Roism(data) {
  const [roi, setRoi] = useState(0);
  const day = 7;
  const urlInfoNft = API_LINK + "v1/info-nft/" + data.data;
  function getDay(days) {
    if (days > 1 && days < 10) {
      return 7;
    } else if (days > 10 && days < 21) {
      return 14;
    } else if (days > 20 && days < 31) {
      return 14;
    } else if (days > 30 && days < 51) {
      return 21;
    } else if (days > 50 && days < 101) {
      return 21;
    } else if (days > 100 && days < 201) {
      return 14;
    } else if (days > 200) {
      return 7;
    } else {
      return 7;
    }
  }
  async function getItem() {
    try {
      await Axios.get(urlInfoNft, {
        headers: {},
      })
        .then((e) => {
          setRoi(e.data.nft.roi);
        })
        .catch((err) => console.log("Err: ", err));
    } catch (e) {
      console.log(e);
    }
  }
  getItem();
  return (
    <p className="roinp">
      <span className="roin">ROI: </span>
      {roi} FIFAC/{getDay(data.category)}D
    </p>
  );
}

function Roisx(data) {
  const [roi, setRoi] = useState(0);
  const day = 7;
  const urlInfoNft = API_LINK + "v1/info-nft/" + data.data;
  function getDay(days) {
    if (days > 1 && days < 10) {
      return 7;
    } else if (days > 10 && days < 21) {
      return 14;
    } else if (days > 20 && days < 31) {
      return 14;
    } else if (days > 30 && days < 51) {
      return 21;
    } else if (days > 50 && days < 101) {
      return 21;
    } else if (days > 100 && days < 201) {
      return 14;
    } else if (days > 200) {
      return 7;
    } else {
      return 7;
    }
  }
  async function getItem() {
    try {
      await Axios.get(urlInfoNft, {
        headers: {},
      })
        .then((e) => {
          setRoi(e.data.nft.roi);
        })
        .catch((err) => console.log("Err: ", err));
    } catch (e) {
      console.log(e);
    }
  }
  getItem();
  return (
    <p className="roinp">
      <span className="roin"></span>
      {roi}
      <span className="fifan">FIFAC</span>/{getDay(data.category)}D
    </p>
  );
}
function GetPrice(data) {
  const _meta = useContext(meta);
  const [price, setPrice] = useState([0]);
  async function getPrices() {
    try {
      const txi = await getCurrentPrice(_meta.web3, _meta.address, data.id);
      setPrice((txi / 1e18).toString());
    } catch (error) {}
  }
  getPrices();
  return price;
}

const getCurrentPriceC = (auction) => {
  const now = Date.now() / 1000;
  const endingPrice = Number(
    web3.utils.fromWei(
      auction.endingPrice.toLocaleString("fullwide", {
        useGrouping: false,
      })
    )
  );
  const duration = Number(auction.duration);
  const startedAt = Number(auction.timestamp);
  if (now >= startedAt + duration) return endingPrice;
  const startingPrice = Number(
    web3.utils.fromWei(
      auction.startingPrice.toLocaleString("fullwide", {
        useGrouping: false,
      })
    )
  );
  const price =
    ((endingPrice - startingPrice) / duration) * (now - startedAt) +
    startingPrice;
  if (endingPrice <= startingPrice) return price;
  return Math.min(Math.ceil(price * 1.05 * 10 ** 2) / 10 ** 2, endingPrice);
};

const BodyShop = () => {
  const baseUrl = API_LINK + "v1/marketplace/auction?limit=100000000";
  const _meta = useContext(meta);
  const [items, setItems] = useState([]);

  const [url, setUrl] = useState(baseUrl);
  const [newUrl, setNewUrl] = useState(baseUrl);

  const [searchParams, setSearchParams] = useSearchParams();
  const [address, setAddress] = useState("");

  const [keyWord, setKeyWord] = useState([]);
  const [top, setTop] = useState([]);
  const [team, setTeam] = useState([]);
  const [sortValue, setSortValue] = useState("Latest");
  const [keyLoad, setKeyLoad] = useState(0);

  const [nftList, setNftList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (_meta.address) {
      setAddress(_meta.address);
    }
  }, [_meta.address]);

  function keyWordChange(event) {
    if (event.target.value) {
      let idso = [];
      for (const prop in mapCardFull) {
        if (prop.includes(event.target.value.toLowerCase())) {
          idso.push(mapCardFull[prop]);
        }
      }
      if (idso.length > 0) {
        setKeyWord(idso);
      } else {
        setKeyWord([8888888888888888888]);
      }
    } else {
      setKeyWord([]);
    }
  }

  useEffect(() => {
    let paramSearch = allIDs;
    if (keyWord.length > 0) {
      let keyo = paramSearch.filter((element) => keyWord.includes(element));
      if (keyo.length > 0) {
        paramSearch = paramSearch.filter((element) =>
          keyWord.includes(element)
        );
      } else {
        paramSearch = [999999999999999];
      }
    }
    if (top.length > 0) {
      let keyo = paramSearch.filter((element) => top.includes(element));
      if (keyo.length > 0) {
        paramSearch = paramSearch.filter((element) => top.includes(element));
      } else {
        paramSearch = [999999999999999];
      }
    }
    if (team.length > 0) {
      let keyo = paramSearch.filter((element) => team.includes(element));
      if (keyo.length > 0) {
        paramSearch = paramSearch.filter((element) => team.includes(element));
      } else {
        paramSearch = [999999999999999];
      }
    }

    let texto = "";
    for (let i = 0; i < paramSearch.length; i++) {
      texto += paramSearch[i] + ",";
    }
    if (paramSearch.length > 0) {
      setUrl(
        newUrl + "&cardIds=[" + texto.slice(0, -1) + "]" + "&sort=" + sortValue
      );
    }
  }, [keyWord, top, team, sortValue]);

  useEffect(() => {
    async function getItems() {
      try {
        await Axios.get(url, {
          headers: {},
        })
          .then((e) => {
            setItems(e.data.items);
            setKeyLoad(new Date().getTime());
          })
          .catch((err) => console.log("Err: ", err));
      } catch (e) {
        console.log(e);
      }
    }
    getItems();
    // console.log("url", url);
  }, [url]);

  useEffect(() => {
    async function getItems() {
      let dt = [];
      let map = [];
      if (items) {
        for (let i = 0; i < items.length; i++) {
          dt.push(items[i].ids[0]);
        }
      }
      await Axios.post(
        API_LINK + "v1/info-nft-list",
        {
          tokenIds: dt,
        },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
        .then((e) => {
          if (e && e.data && e.data.nft && e.data.nft.length > 0) {
            for (let i = 0; i < e.data.nft.length; i++) {
              let ndft = e.data.nft[i];
              map[ndft.tokenId] = ndft.roi;
            }
          }
          setNftList(map);
        })
        .catch((err) => console.log("Err: ", err));
      // setItems(dt);
    }
    getItems();
  }, [items]);
  //xử lú model
  const [isBuying, setIsBuying] = useState(false);
  const [dataBuy, setDataBuy] = useState({});
  const [isLoading, setIsLoading] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleBuy = (_dataBuy) => {
    setIsBuying(true);
    setDataBuy(_dataBuy);
  };
  const handleClose = () => {
    setIsBuying(false);
  };

  function load() {
    setUrl(url + " ");
  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "transparent",
      borderRadius: "6px",
      borderColor: "#f8f9fa",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: "#1890ff",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "6px",
      marginTop: 0,
      background: "rgba(11,31,79,0.6)",
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      background: "transparent",
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }),
    singleValue: (base) => ({
      ...base,
      height: "100%",
      color: "#f8f9fa",
      paddingTop: "3px",
    }),
    placeholder: (base) => {
      return {
        ...base,
        color: "#f8f9fa",
      };
    },
  };

  const handleChangeTop = (valuec) => {
    let topc = [];
    if (valuec.value > 0) {
      for (let i = 1; i < valuec.value + 1; i++) {
        topc.push(i);
      }
    }
    setTop(topc);
  };

  const handleChangeTeam = (valuec) => {
    if (valuec.value && valuec.value !== "all") {
      setTeam(MAP_TEAM[valuec.value]);
    } else {
      setTeam([]);
    }
  };
  const handleChangeSoft = (valuec) => {
    // console.log("valuec", valuec.value);
    if (valuec.value) {
      setSortValue(valuec.value);
    } else {
      setSortValue(valuec.value);
    }
  };

  //phân trang
  // We start with an empty list of items.
  const itemsPerPage = 18;

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    if (items && items != undefined && items.length > 0) {
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    } else {
      setCurrentItems([]);
      setPageCount(0);
    }
  }, [itemOffset, itemsPerPage, items, keyLoad]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <Wrapper>
      <HeaderShop />
      <div className="container">
        <div className="l-content-flex">
          <div className="l-main">
            <div className="c-filter">
              <ul>
                <li> </li> <li> </li>
                <li style={{ zIndex: "10" }}>
                  <Select
                    defaultValue={""}
                    placeholder={"Top"}
                    onChange={handleChangeTop}
                    options={topOptions}
                    styles={customStyles}
                  />
                </li>
                <li style={{ zIndex: "10" }}>
                  <Select
                    defaultValue={""}
                    placeholder={"Team"}
                    onChange={handleChangeTeam}
                    options={teamOptions}
                    styles={customStyles}
                  />
                </li>
                <li style={{ zIndex: "10" }}>
                  <Select
                    defaultValue={"Latest"}
                    placeholder={"Latest"}
                    onChange={handleChangeSoft}
                    options={softOptions}
                    styles={customStyles}
                  />
                </li>
                <li>
                  <div className="c-filter__group">
                    <i className="icon24-search-whitex"></i>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Name"
                      onChange={keyWordChange}
                    ></input>
                  </div>
                </li>
              </ul>
            </div>
            <div className="c-card-grid is-slot-normal">
              <ul>
                {currentItems
                  ? currentItems.map((item) => (
                      <li key={item._id} className="zoomd">
                        <div
                          className="c-card-item is-market"
                          onClick={(e) =>
                            handleBuy({
                              key: item._id,
                              price: 9999,
                              item: item,
                              opend: true,
                              priceC: getCurrentPriceC(item),
                            })
                          }
                        >
                          <div className="c-card-item__bgx">
                            <img
                              src={
                                APP_IMAGE_API +
                                item.category[0] +
                                ".png"
                              }
                              alt="bg"
                            ></img>
                          </div>
                          <div className="c-card-item__content">
                            <div className="c-card-item__textxd idxxx">
                              <p className="is-small">#{item.ids[0]} &nbsp;</p>
                            </div>
                            <div className="c-card-item__textxd idxxx">
                              <p className="roinp">
                                <span className="roin"></span>
                                {nftList[item.ids[0]]}
                                <span className="fifan">FIFAC</span>/
                                {getDayC(item.category[0])}D
                              </p>
                            </div>
                          </div>
                          <br />
                          <div className="c-card-item__coint">
                            <i className="icon30-coin"></i>
                            {getCurrentPriceC(item)}
                          </div>
                        </div>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>

            <div className="b-page">
              <ReactPaginate
                nextLabel={<i className="icon16-arrow-right"></i>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel={<i className="icon16-arrow-left"></i>}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalBuy
        isOpen={isBuying}
        dataBuy={dataBuy}
        onClose={(e) => handleClose()}
        dataRoi={(e) => (
          <Roism
            key={dataBuy.item ? dataBuy.item._id : ""}
            data={dataBuy.item ? dataBuy.item.ids[0] : ""}
            category={dataBuy.item ? dataBuy.item.category[0] : ""}
          />
        )}
        price={(e) => (
          <GetPrice
            key={dataBuy.item ? dataBuy.item._id : ""}
            id={dataBuy.item ? dataBuy.item.auctionId : ""}
          />
        )}
        load={(e) => load()}
      />
    </Wrapper>
  );
};
export { BodyShop };
