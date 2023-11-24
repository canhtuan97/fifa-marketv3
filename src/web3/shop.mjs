import {
  FIFA_TOKEN,
  FIFA_SALE,
  FIFA_NFT,
  AMOUNT_APPROVE,
  BASE_URL,
} from "./../const/const";
import { FIFA_TOKEN_ABI, FIFA_SALE_ABI } from "./abi.mjs";
import { genContract, approve, allowance } from "./utils.mjs";
import { getBalanceTokenERC20 } from "./utils.mjs";

const approveFIFA = async (_web3, _from) => {
  return await approve(
    _web3,
    FIFA_TOKEN_ABI,
    FIFA_TOKEN,
    _from,
    FIFA_SALE,
    AMOUNT_APPROVE
  );
};

const allowanceFIFA = async (_web3, _from) => {
  return await allowance(_web3, FIFA_TOKEN_ABI, FIFA_TOKEN, FIFA_SALE, _from);
};

const getPriceTop10 = async (_web3) => {
  const ctract = genContract(_web3, FIFA_SALE_ABI, FIFA_SALE);
  return await ctract.methods.top10PackPrice().call();
};

const getPriceTop20 = async (_web3) => {
  const ctract = genContract(_web3, FIFA_SALE_ABI, FIFA_SALE);
  return await ctract.methods.top20PackPrice().call();
};

const getPriceTop30 = async (_web3) => {
  const ctract = genContract(_web3, FIFA_SALE_ABI, FIFA_SALE);
  return await ctract.methods.top30PackPrice().call();
};

const getPriceTop50 = async (_web3) => {
  const ctract = genContract(_web3, FIFA_SALE_ABI, FIFA_SALE);
  return await ctract.methods.top50PackPrice().call();
};

const getPriceTop100 = async (_web3) => {
  const ctract = genContract(_web3, FIFA_SALE_ABI, FIFA_SALE);
  return await ctract.methods.top100PackPrice().call();
};

const getPriceTop200 = async (_web3) => {
  const ctract = genContract(_web3, FIFA_SALE_ABI, FIFA_SALE);
  return await ctract.methods.top200PackPrice().call();
};

const getBalanceFIFA = async (_web3, _from) => {
  if (!_from) return 0;
  return await getBalanceTokenERC20(_web3, FIFA_TOKEN_ABI, FIFA_TOKEN, _from);
};

const buyCard = async (_web3, _from, _topKey, _amountItems) => {
  const txi = {};

  const ctract = genContract(_web3, FIFA_SALE_ABI, FIFA_SALE);

  const _allowance = await allowanceFIFA(_web3, _from);

  if (Number(_allowance) <= 0) await approveFIFA(_web3, _from);

  await ctract.methods
    .buyCard(_topKey, _amountItems)
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
  buyCard,
  approveFIFA,
  getPriceTop10,
  getPriceTop20,
  getPriceTop30,
  getPriceTop50,
  getPriceTop100,
  getPriceTop200,
  getBalanceFIFA,
};
