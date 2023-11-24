import React, { createContext, useState, useEffect } from "react";
import { CHAIN_ID } from "./../const/const";
import { hexToNumber } from "./../web3/utils.mjs";
import {
  getAccount,
  getBalance,
  getChainId,
  initWeb3,
} from "./../web3/login.mjs";
import { isEmpty } from "lodash";
import { getBalanceFIFA } from "./../web3/shop.mjs";
import { getBalanceBUSD } from "./../web3/ido.mjs";

const MetaConnect = createContext();

export const MetaProvider = ({ children }) => {
  const [web3, setWeb3] = useState(initWeb3(window));
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState(null);
  const [balance, setBalance] = useState(0);
  const [balanceFF, setBalanceFF] = useState(0);
  const [balanceBUSD, setBalanceBUSD] = useState(0);

  if (typeof window.ethereum !== "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (isEmpty(accounts)) {
        setIsConnected(false);
        setAddress("");
        setBalance(0);
        setBalanceFF(0);
        setBalanceBUSD(0);
      } else {
        setAddress(accounts[0]);
        if (chainId === CHAIN_ID) {
          getBalance(web3, accounts[0]).then((_balance) =>
            setBalance(Number(_balance) / Math.pow(10, 18))
          );
          getBalanceFIFA(web3, accounts[0]).then((amount) =>
            setBalanceFF(Number(amount) / Math.pow(10, 18))
          );
          getBalanceBUSD(web3, accounts[0]).then((amount) =>
            setBalanceBUSD(Number(amount) / Math.pow(10, 18))
          );
        }
      }
    });

    window.ethereum.on("chainChanged", (_chainId) => {
      setChainId(checkChainId(_chainId));
      if (checkChainId(_chainId) === CHAIN_ID && isConnected) {
        getBalance(web3, address).then((_balance) => {
          setBalance(Number(_balance) / Math.pow(10, 18));
        });
        getBalanceFIFA(web3, address).then((amount) =>
          setBalanceFF(Number(amount) / Math.pow(10, 18))
        );
        getBalanceBUSD(web3, address).then((amount) =>
          setBalanceBUSD(Number(amount) / Math.pow(10, 18))
        );
      } else {
        setBalance(0);
        setBalanceFF(0);
        setBalanceBUSD(0);
      }
    });
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      if (!web3) setWeb3(initWeb3(window));

      let _isConnected = false;
      let _address = "";
      getAccount(web3).then((_accounts) => {
        if (!isEmpty(_accounts)) {
          setIsConnected(true);
          setAddress(_accounts[0]);
          _isConnected = true;
          _address = _accounts[0];
        }
      });
      getChainId(web3).then((_chainId) => {
        setChainId(checkChainId(_chainId));
        if (checkChainId(_chainId) === CHAIN_ID && _isConnected) {
          getBalance(web3, _address).then((amount) =>
            setBalance(Number(amount) / Math.pow(10, 18))
          );
          getBalanceFIFA(web3, _address).then((amount) =>
            setBalanceFF(Number(amount) / Math.pow(10, 18))
          );
          getBalanceBUSD(web3, _address).then((amount) =>
            setBalanceBUSD(Number(amount) / Math.pow(10, 18))
          );
        }
      });
    }
  }, []);
  const checkChainId = (_chainId) => {
    if (typeof _chainId !== "number") return hexToNumber(_chainId);
    return _chainId;
  };

  return (
    <MetaConnect.Provider
      value={{
        isConnected,
        chainId,
        balance,
        address,
        web3,
        balanceFF,
        balanceBUSD,
        setIsConnected,
        setChainId,
        setBalance,
        setAddress,
        setWeb3,
        setBalanceFF,
        setBalanceBUSD,
      }}
    >
      {children}
    </MetaConnect.Provider>
  );
};

export default MetaConnect;
