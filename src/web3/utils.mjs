import Web3 from "web3";

const web3Default = new Web3(Web3.givenProvider);

const initWeb3 = (_window) => {
  if (typeof _window.ethereum !== "undefined") {
    return new Web3(_window.ethereum);
  }
  return null;
};

const intToWei = (_amount) => {
  return web3Default.utils.toWei(_amount.toString(), "ether");
};

const hexToNumber = (_hexCode) => {
  return web3Default.utils.hexToNumber(_hexCode);
};

const approve = async (_web3, _abi, _addr, _from, _spender, _amount) => {
  const ctract = genContract(_web3, _abi, _addr);
  return await ctract.methods.approve(_spender, _amount).send({ from: _from });
};

const allowance = async (_web3, _abi, _addr, _spender, _from) => {
  const ctract = genContract(_web3, _abi, _addr);
  return await ctract.methods.allowance(_from, _spender).call();
};

const genContract = (_web3, _abi, _addr) => {
  return new _web3.eth.Contract(_abi, _addr);
};

const getBalanceTokenERC20 = async (_web3, _abi, _addr, _from) => {
  const ctract = genContract(_web3, _abi, _addr);
  return await ctract.methods.balanceOf(_from).call();
};

export {
  hexToNumber,
  genContract,
  initWeb3,
  approve,
  allowance,
  getBalanceTokenERC20,
  intToWei,
};
