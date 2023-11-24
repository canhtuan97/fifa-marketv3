import { genContract, approve, allowance } from "./utils.mjs";
import { ABI_MARKET, ABI_FIFA_TOKEN, ABI_FIFA_NFT } from "./marketAbi.mjs";
import { FIFA_SALE_ABI } from "./abi.mjs";


import {
  FIFA_TOKEN,
  FIFA_SALE,
  FIFA_NFT,
  BASE_URL,
  CT_MARKET,
  AMOUNT_APPROVE
} from "./../const/const";

const CT_TOKEN = FIFA_TOKEN;
const CT_NFT = FIFA_NFT;
const CT_FIFA_SALE = FIFA_SALE;

const getCurrentPrice = async (_web3, _from, _auctionId) => {
  const ct = genContract(_web3, ABI_MARKET, CT_MARKET);
  return await ct.methods.getCurrentPrice(_auctionId).call();
};

const approveTokenForMarket = async (_web3, _from) => {
  await approve(
    _web3,
    ABI_FIFA_TOKEN,
    CT_TOKEN,
    _from,
    CT_MARKET,
    AMOUNT_APPROVE
  );
};

const checkAllowanceToken = async (_web3, _from) => {
  return await allowance(_web3, ABI_FIFA_TOKEN, CT_TOKEN, CT_MARKET, _from);
};

// const approveNFTForMarket = async (_web3, _from, _spender, _tokenId) => {
//   const ct = genContract(_web3, ABI_FIFA_NFT, CT_NFT);
//   await ct.methods.approve(_spender, _tokenId).send({ from: _from });
// };

const approveNFTForMarket = async (_web3, _from, _spender, _tokenId) => {
  const ct = genContract(_web3, ABI_FIFA_NFT, CT_NFT);
  await ct.methods.setApprovalForAll(_spender, true).send({ from: _from });
};

const checkApprovedNFT = async (_web3, _tokenId) => {
  const ct = genContract(_web3, ABI_FIFA_NFT, CT_NFT);
  return await ct.methods.getApproved(_tokenId);
};

const buyNFT = async (_web3, _from, _auctionId, _amount) => {
  const txi = {};

  const ctract = genContract(_web3, ABI_MARKET, CT_MARKET);

  const _allowance = await checkAllowanceToken(_web3, _from);

  if (Number(_allowance) <= 0) await approveTokenForMarket(_web3, _from);

  await ctract.methods
    .bid(_auctionId, _amount)
    .send({ from: _from })
    .then((e) => {
      if (e["status"]) {
        txi["status"] = "success";
      } else {
        txi["status"] = "fail";
      }
    })
    .catch((e) => {
      if (e["code"] === 4001) {
        txi["status"] = "reject";
      } else {
        txi["status"] = "fail";
      }
    });
  return txi;
};

const sellNFT = async (_web3, _from, _tokenId, _price) => {
  const txi = {};

  const ctract = genContract(_web3, ABI_MARKET, CT_MARKET);

  await approveNFTForMarket(_web3, _from, CT_MARKET);

  await ctract.methods
    .createAuction({
      erc721: CT_NFT,
      _erc721TokenIds: [`${_tokenId}`],
      _startingPrice: _price,
      _endingPrice: _price,
      _duration: 999999999,
    })
    .send({ from: _from })
    .then((e) => {
      if (e["status"]) {
        txi["status"] = "success";
      } else {
        txi["status"] = "fail";
      }
    })
    .catch((e) => {
      if (e["code"] === 4001) {
        txi["status"] = "reject";
      } else {
        txi["status"] = "fail";
      }
    });
  return txi;
};

const cancelSellNFT = async (_web3, _from, _auctionId) => {
  const txi = {};

  const ctract = genContract(_web3, ABI_MARKET, CT_MARKET);

  await ctract.methods
    .cancelAuction(_auctionId)
    .send({ from: _from })
    .then((e) => {
      if (e["status"]) {
        txi["status"] = "success";
      } else {
        txi["status"] = "fail";
      }
    })
    .catch((e) => {
      if (e["code"] === 4001) {
        txi["status"] = "reject";
      } else {
        txi["status"] = "fail";
      }
    });
  return txi;
};

const claimCard = async (
  _web3,
  _from,
  _cardId,
  _top,
  _nonceClaim,
  _v,
  _r,
  _s
) => {
  const ct = genContract(_web3, FIFA_SALE_ABI, CT_FIFA_SALE);
  const txi = {};
  await ct.methods
    .claimCard(_cardId, _top,_nonceClaim, _v, _r, _s)
    .send({ from: _from })
    .then((e) => {
      if (e["status"]) {
        txi["status"] = "success";
      } else {
        txi["status"] = "fail";
      }
    })
    .catch((e) => {
      if (e["code"] === 4001) {
        txi["status"] = "reject";
      } else {
        txi["status"] = "fail";
      }
    });
  return txi;
};

const getListTokenIds = async (_web3, _address) => {
  const ct = genContract(_web3, ABI_FIFA_NFT, CT_NFT);
  const _totalNFT = await ct.methods.balanceOf(_address).call();
  return await ct.methods
    .tokenOfOwnerByIndexBatch(_address, 0, _totalNFT - 1)
    .call();
};

export {
  getCurrentPrice,
  buyNFT,
  getListTokenIds,
  sellNFT,
  cancelSellNFT,
  claimCard,
};
