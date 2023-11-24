import {
  genContract,
  approve,
  allowance,
  getBalanceTokenERC20,
} from "./utils.mjs";
import {
  BRIDGE_CONTRACT,
  BRIDGE_CONTRACT_M3,
  FIFA_TOKEN,
  AMOUNT_APPROVE,
  BUSD_TOKEN,
} from "./../const/const";
import { FIFA_TOKEN_ABI, BUSD_ABI } from "./abi.mjs";
import { BRIDGE_ABI, BRIDGE_ABI_M3 } from "./bridgeAbi.mjs";

const getBalanceBUSD = async (_web3, _from) => {
  if (!_from) return 0;
  return await getBalanceTokenERC20(_web3, BUSD_ABI, BUSD_TOKEN, _from);
};

const approveFIFA = async (_web3, _from) => {
  return await approve(
    _web3,
    FIFA_TOKEN_ABI,
    FIFA_TOKEN,
    _from,
    BRIDGE_CONTRACT,
    AMOUNT_APPROVE
  );
};

const approveFIFA_M3 = async (_web3, _from) => {
  return await approve(
    _web3,
    FIFA_TOKEN_ABI,
    FIFA_TOKEN,
    _from,
    BRIDGE_CONTRACT_M3,
    AMOUNT_APPROVE
  );
};

const approveFIFA_M3_BUSD = async (_web3, _from) => {
  return await approve(
    _web3,
    BUSD_ABI,
    BUSD_TOKEN,
    _from,
    BRIDGE_CONTRACT_M3,
    AMOUNT_APPROVE
  );
};

const allowanceFIFA = async (_web3, _from) => {
  return await allowance(
    _web3,
    FIFA_TOKEN_ABI,
    FIFA_TOKEN,
    BRIDGE_CONTRACT,
    _from
  );
};

const allowanceFIFA_M3 = async (_web3, _from) => {
  return await allowance(
    _web3,
    FIFA_TOKEN_ABI,
    FIFA_TOKEN,
    BRIDGE_CONTRACT_M3,
    _from
  );
};

const allowanceFIFA_M3_BUSD = async (_web3, _from) => {
  return await allowance(
    _web3,
    BUSD_ABI,
    BUSD_TOKEN,
    BRIDGE_CONTRACT_M3,
    _from
  );
};

const deposit = async (_web3, _from, _amount) => {
  const txi = {};

  const ctract = genContract(_web3, BRIDGE_ABI, BRIDGE_CONTRACT);

  const _allowance = await allowanceFIFA(_web3, _from);

  if (Number(_allowance) <= 0) await approveFIFA(_web3, _from);

  await ctract.methods
    .sendInGame(_amount)
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

const deposit_m3 = async (_web3, _from, _amount) => {
  const txi = {};

  const ctract = genContract(_web3, BRIDGE_ABI_M3, BRIDGE_CONTRACT_M3);

  const _allowance = await allowanceFIFA_M3(_web3, _from);

  if (Number(_allowance) <= 0) await approveFIFA_M3(_web3, _from);

  await ctract.methods
    .sendInGame(_amount)
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

const deposit_m3_BUSD = async (_web3, _from, _amount) => {
  const txi = {};

  const ctract = genContract(_web3, BRIDGE_ABI_M3, BRIDGE_CONTRACT_M3);

  const _allowance = await allowanceFIFA_M3_BUSD(_web3, _from);

  if (Number(_allowance) <= 0) await approveFIFA_M3_BUSD(_web3, _from);

  await ctract.methods
    .sendInGame(_amount)
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

const withdraw = async (
  _web3,
  _from,
  _amount,
  _earnInGame,
  _spendInGame,
  _timestamp,
  v,
  r,
  s
) => {
  const txi = {};

  const ctract = genContract(_web3, BRIDGE_ABI, BRIDGE_CONTRACT);

  await ctract.methods
    .withdraw(_amount, _earnInGame, _spendInGame, _timestamp, v, r, s)
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
const withdraw_m3 = async (_web3, _from, _amount, _timestamp, v, r, s) => {
  const txi = {};

  const ctract = genContract(_web3, BRIDGE_ABI_M3, BRIDGE_CONTRACT_M3);

  await ctract.methods
    .withdraw(_amount, _timestamp, v, r, s)
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

const withdraw_m3_BUSD = async (_web3, _from, _amount, _timestamp, v, r, s) => {
  const txi = {};

  const ctract = genContract(_web3, BRIDGE_ABI_M3, BRIDGE_CONTRACT_M3);

  await ctract.methods
    .withdraw(_amount, _timestamp, v, r, s)
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
  deposit,
  deposit_m3,
  deposit_m3_BUSD,
  withdraw,
  withdraw_m3,
  withdraw_m3_BUSD,
  getBalanceBUSD,
};
