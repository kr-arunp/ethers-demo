/** @format */

import React, { useState } from "react";
import { ethers } from "ethers";
import { ContractABI } from "./Wallet";
// import { parseEther } from "ethers/lib/utils";
const SendEthers = () => {
  const [Input, setInput] = useState("");
  const [Add, setAdd] = useState("");
  const Contract_ABI=ContractABI;
  const ContractAddress = "0xFFed0E64DF0E80B1b23306A033fba594A9d5D270";
  //providers 
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner();
  let contract = new ethers.Contract(ContractAddress, Contract_ABI, signer);
 
  
  let ChangeHandler = (e) => {
    let value = e.target.value;
    if (value <= 10) {
      setInput(value);
    } else {
      alert("Please Enter Amount between (0,10]");
    }
  };
  //this is Write access method  
  //it actually executes the setValue() function which is available 
  //inside the Deployed Contract
  let WriteContract = async () => {
    // console.log("🚀 ~ file: SendEthers.js:26 ~ WriteContract ~ provider:", provider)
    await provider.send("eth_requestAccounts",[]);
    contract.setValue(12);
  };
  let SendHandler = async () => {
    // WriteContract();
    let num =Input
    if (num <= 0.000999)  {
    //Conversion from ETH to wie
     const AmountToSend = ethers.utils.parseEther(num);
     //Pop-up the wallet/meta mask
     await provider.send("eth_requestAccounts", []);
     //sendETHContract() is method  in the contract which allows to receives the 
     //ETH  from the user wallet
     await contract.sendEthContract({ value: AmountToSend });
}else {
      alert("Please Re-Enter Amount between 0.0001 to 0.000999ETH");
    }
  };
  return (
    <div>
      <h1>Send Ethers to Anyone</h1>
      <input
        type="text"
        placeholder="Enter Wallet Add or ENS name for the Receiver"
        onChange={(e) => setAdd(e.target.value)}
        value={Add}
      />
      <input
        type="text"
        placeholder="Enter Amount in ether"
        onChange={ChangeHandler}
        value={Input}
      />
      <button onClick={SendHandler}>Send</button>
    </div>
  );
};

export default SendEthers;
