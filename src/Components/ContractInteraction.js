/** @format */

let { ethers } = require("ethers");
let { ContractABI } = require("./Wallet");
const provider = new ethers.providers.JsonRpcProvider(
  "https://goerli.infura.io/v3/94c8e476550e42f4a57417d204707da7"
);
let WalletABI = ContractABI;
// The address of the deployed contract on the blockchain
let walletAddress = "0xFFed0E64DF0E80B1b23306A033fba594A9d5D270";
let ContractInteraction = async () => {
  const ContractObject = new ethers.Contract(
    walletAddress,
    WalletABI,
    provider
  );
  //getting ContractName
  let getContractName = await ContractObject.name();
  console.log(
    "🚀 ~ file: ContractInteraction.js:19 ~ getContractName:",
    getContractName
  );

  // let ContractSymbol = await ContractObject.symbol();
  // console.log("🚀 ~ file: ContractInteraction.js:23 ~ ContractInteraction ~ ContractSymbol:", ContractSymbol)

  //getting contract balance
  let ContractBalance = await ContractObject.contractBalance();
  console.log(
    "🚀 ~ file: ContractInteraction.js:113 ~ ContractInteraction ~ ContractBalance:",
    ContractBalance / 10 ** 18
  );
  //getValue from the contract
  let Value = await ContractObject.getValue();
  let ContractValue = ethers.utils.formatEther(Value);
  console.log(
    "🚀 ~ file: ContractInteraction.js:122 ~ ContractInteraction ~ ContractValue:",
    ContractValue
  );
  //getting accountBalance of the user
  let accountBalance = await ContractObject.accountBalance(
    "0xD890b83b54E43b7FbB85B55A5cEC42726710B27A"
  );
  let UserWalletBalance = ethers.utils.formatEther(accountBalance);
  console.log(
    "🚀 ~ file: ContractInteraction.js:128 ~ ContractInteraction ~ UserWalletBalance:",
    UserWalletBalance
  );
};
ContractInteraction();
