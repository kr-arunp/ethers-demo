let { ethers }=require('ethers');
const { ContractABI }=require('./ContractABI');

let rpcURL='https://cloudflare-eth.com/';

let provider=new ethers.providers.JsonRpcProvider(rpcURL);
const ContractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const ABI=ContractABI;
let contract=new ethers.Contract(ContractAddress, ABI, provider);

let getData=async () => {
	let name=await contract.name();
	console.log("🚀 ~ file: ReadAccess.js:12 ~ name:", name)
	let symbol=await contract.symbol();
	console.log("🚀 ~ file: ReadAccess.js:15 ~ getData ~ symbol:", symbol)
	let Balance=await contract.totalSupply();
	console.log("🚀 ~ file: ReadAccess.js:17 ~ getData ~ Balance:", Balance/10**18)
	let decimal=await contract.decimals();
	console.log("🚀 ~ file: ReadAccess.js:19 ~ getData ~ decimal:", decimal)
	let isValid=await ethers.utils.isAddress('ethers.eth')
	console.log("🚀 ~ file: ReadAccess.js:21 ~ getData ~ isValid:", isValid)
	  const isValidENS = await provider.resolveName("persons.eth");

	console.log("🚀 ~ file: ReadAccess.js:23 ~ getData ~ isValidENS:", isValidENS)
	
	let balance = await provider.getBalance(((isValidENS)));
	console.log(
    "🚀 ~ file: ReadAccess.js:27 ~ getData ~ balance:",
    ethers.utils.formatEther(balance)
  );
	
}
getData();
