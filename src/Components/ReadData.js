/** @format */

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ethers } from "ethers";
const ContractInteraction = () => {
  const [contractName, setContractName] = useState("");
  const [contractBalance, setContractBalance] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [userWalletBalance, setUserWalletBalance] = useState("");

  const WalletABI = [
    {
      inputs: [],
      name: "sendEthContract",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "sendEthUser",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_num",
          type: "uint256",
        },
      ],
      name: "setValue",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_address",
          type: "address",
        },
      ],
      name: "accountBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "contractBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getValue",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/94c8e476550e42f4a57417d204707da7"
  );
  const walletAddress = "0xFFed0E64DF0E80B1b23306A033fba594A9d5D270";
  const contractObject = new ethers.Contract(
    walletAddress,
    WalletABI,
    provider
  );

  const fetchData = async () => {
    // get contract name
    const name = await contractObject.name();
    setContractName(name);

    // get contract balance
    const balance = await contractObject.contractBalance();
    setContractBalance(ethers.utils.formatEther(balance));

    // get value from contract
    const value = await contractObject.getValue();
    setContractValue(ethers.utils.formatEther(value));

    // get user wallet balance
    const userBalance = await contractObject.accountBalance(
      "0xD890b83b54E43b7FbB85B55A5cEC42726710B27A"
    );
    setUserWalletBalance(ethers.utils.formatEther(userBalance));
  };

  let getData = () => {
    fetchData();
  };
  return (
    <Container>
      <Row>
        <Col>
          <h3>Contract Name: {contractName}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Contract Balance: {contractBalance}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Contract Value: {contractValue}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>User Wallet Balance: {userWalletBalance}</h3>
        </Col>
      </Row>
      <Button onClick={getData}>getData</Button>
    </Container>
  );
};
export default ContractInteraction;
