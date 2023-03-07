/** @format */

import { parseEther, parseUnits } from "ethers/lib/utils";
import React, { useState } from "react";
// import { ethers } from "ethers";
const ethers = require("ethers");
const EtherExample = () => {
  let URL = `https://mainnet.infura.io/v3/94c8e476550e42f4a57417d204707da7`;
  const [currBlockNumber, setCurrBlockNumber] = useState();
  const [WalletBalance, setWalletBalance] = useState();
  const provider = new ethers.providers.JsonRpcProvider(URL);
  const getBlockNumber = async () => {
    let blockNumber = await provider.getBlockNumber();
    setCurrBlockNumber(blockNumber);
  };

  const getWalletBalance = async () => {
    let Balance = await provider.getBalance(`ethers.eth`);
    // convert it to ETH from Wie
    let ETH = ethers.utils.formatEther(Balance);
    console.log(
      "🚀 ~ file: EtherExample.jsx:22 ~ getWalletBalance ~ Balance:",
      ETH
    );
    setWalletBalance(Balance / 10 ** 18);

    //Convert ETHER Balance to Wei
    let Wei = parseEther("1.0");
    console.log(
      "🚀 ~ file: EthersExample.js:29 ~ getWalletBalance ~ Wei:",
      Wei
    );

    // Convert user-provided strings in gwei to wei for max base fee
    let feePerGas = parseUnits("4.5", "gwei");
    console.log(
      "🚀 ~ file: EthersExample.js:36 ~ getWalletBalance ~ feePerGas:",
      feePerGas
    );
    // 4500000000n
    console.log(feePerGas / 10 ** 9);
    // Get the next nonce required to send a transaction
   const TrnxCount= await provider.getTransactionCount("ethers.eth");
   console.log("🚀 ~ file: EthersExample.js:45 ~ getWalletBalance ~ TrnxCount:", TrnxCount)
  };
  
  
  
  
  let ConnectToWallet = async () => {
    let DefaultProvider;
    if (window.ethereum == null){
      console.log("Metamask Wallet is not installed");
      alert("Metamask Wallet is not installed");
       DefaultProvider=ethers.getDefaultProvider();
       console.log("🚀 ~ file: EthersExample.js:32 ~ ConnectToWal ~ DefaultProvider:", DefaultProvider)
    } else {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
       await window.ethereum.request({ method: "eth_requestAccounts" });
      // console.log("🚀 ~ file: EtherExample.jsx:25 ~ ConnectToWallet ~ provider:", provider)
      const signer =  provider.getSigner();
      console.log(
        "🚀 ~ file: EtherExample.jsx:25 ~ ConnectToWallet ~ signer:",
        signer
      );
    }
  };

  return (
    <>
      <div>
        <p>Current Wallet Number is {currBlockNumber}</p>
        <p>Wallet Balance {WalletBalance}</p>
        <button onClick={getBlockNumber}>Get Current Block Number</button>
        <button onClick={getWalletBalance}>Get Wallet Balance</button>
        <div>
          <button onClick={ConnectToWallet}>Connect With Wallet</button>
        </div>
      </div>
    </>
  );
};
export default EtherExample;
