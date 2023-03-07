// /** @format */

let { ethers } = require("ethers");
let USDC_ABI =require("./USDC_ABI");

let getTransfer = async () => {
   const rpcURL = "https://cloudflare-eth.com/";
   const contractAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

   const provider = new ethers.providers.JsonRpcProvider(rpcURL);
   const contract = new ethers.Contract(
     contractAddress,
     USDC_ABI.USDC_ABI,
     provider
   );

 const handleTransfer = (from, to, value, event) => {
   console.log(
     `Transfer event received from ${from} to ${to} with value ${value}`
   );
   
	 contract.on("Transfer", (from, to, value, event) => {
		 console.log({
			 from: from,
			 to: to,
			 value: value.toString(),
			 data: event,
		 });
	 });	
	};
	contract.on("Transfer", handleTransfer);
};

getTransfer();
// let  { ethers } =require("ethers");
// let USDC_ABI =require("./USDC_ABI");

// //Node Provider Addres
// const nodeProvider =
//   "https://mainnet.infura.io/v3/a1d29c0dd17c4e35927563f16f82302d";
// const customHttpProvider = new ethers.providers.JsonRpcProvider(nodeProvider);

// //ERC-20 contract address
// const contractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

// const contract = new ethers.Contract(
//   contractAddress,
//   USDC_ABI.USDC_ABI,
//   customHttpProvider
// );

// });
