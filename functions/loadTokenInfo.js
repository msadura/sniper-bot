const { getProvider } = require('../provider');

const ethers = require('ethers');

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const abi = [
  // Some details about the token
  'function name() view returns (string)',
  'function symbol() view returns (string)',

  // Get the account balance
  'function balanceOf(address) view returns (uint)',

  // Send some of your tokens to someone else
  'function transfer(address to, uint amount)',

  // An event triggered whenever anyone transfers to someone else
  'event Transfer(address indexed from, address indexed to, uint amount)'
];

function loadTokenInfo(address) {
  return new ethers.Contract(address, abi, getProvider());
}

async function getTokenSymbol(address) {
  const contract = loadTokenInfo(address);
  return await contract.symbol();
}

module.exports = { loadTokenInfo, getTokenSymbol };
