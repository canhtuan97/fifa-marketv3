import Web3 from "web3";

const initWeb3 = (_window) => {
  if (typeof _window.ethereum !== "undefined") {
    return new Web3(_window.ethereum);
  }
  return null;
};

const getChainId = async (_web3) => {
  return await _web3.eth.getChainId();
};

const getBalance = async (_web3, _address) => {
  if (!_address) return 0;
  return await _web3.eth.getBalance(_address);
};

const getAccount = async (_web3) => {
  return await _web3.eth.getAccounts();
};

export { initWeb3, getChainId, getBalance, getAccount };
