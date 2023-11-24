import {
  getBalanceTokenERC20,
  approve,
  allowance,
  genContract,
} from "./utils.mjs";

import { BUSD_TOKEN, IDO_CONTRACT, AMOUNT_APPROVE } from "./../const/const";

import { BUSD_ABI, FIFA_IDO_ABI } from "./abi.mjs";

const getBalanceBUSD = async (_web3, _from) => {
  if (!_from) return 0;
  return await getBalanceTokenERC20(_web3, BUSD_ABI, BUSD_TOKEN, _from);
};

const approveBUSD = async (_web3, _from) => {
  return await approve(
    _web3,
    BUSD_ABI,
    BUSD_TOKEN,
    _from,
    IDO_CONTRACT,
    AMOUNT_APPROVE
  );
};

const allowanceBUSD = async (_web3, _from) => {
  return await allowance(_web3, BUSD_ABI, BUSD_TOKEN, IDO_CONTRACT, _from);
};

const isInWhiteList = (_web3) => {
  const ctract = genContract(_web3, FIFA_IDO_ABI, IDO_CONTRACT);
  return ctract.methods.whitelistAddress().call();
};

const buyToken = async (_web3, _from, _amount) => {
  const txi = {};

  const ctract = genContract(_web3, FIFA_IDO_ABI, IDO_CONTRACT);

  const _allowance = await allowanceBUSD(_web3, _from);

  if (Number(_allowance) <= 0) await approveBUSD(_web3, _from);

  await ctract.methods
    .buyToken(_amount)
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

const isClaim = (_web3) => {
  const ctract = genContract(_web3, FIFA_IDO_ABI, IDO_CONTRACT);
  return ctract.methods.isClaimToken().call();
};

const claimToken = async (_web3, _from) => {
  const txi = {};

  const ctract = genContract(_web3, FIFA_IDO_ABI, IDO_CONTRACT);

  await ctract.methods
    .claimToken()
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

export {
  getBalanceBUSD,
  approveBUSD,
  allowanceBUSD,
  isInWhiteList,
  buyToken,
  isClaim,
  claimToken,
};
