const ethers = require('ethers');
const { getProvider } = require('../provider');
const { getAccount } = require('../wallet');

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
  return new ethers.Contract(address, abi, getProvider(true));
}

async function getTokenSymbol(address) {
  const contract = loadTokenInfo(address);
  return await contract.symbol();
}

async function getTokenBalance(address, walletAddress) {
  if (!walletAddress) {
    console.warn('Trying to getTokenBalance without specified wallet addres!');
    return;
  }

  const contract = loadTokenInfo(address);
  return await contract.balanceOf(walletAddress);
}

async function transferToken(tokenAddress, toAddress, amount) {
  console.log('🔥', 'tokenAddress', tokenAddress);
  console.log('🔥', 'toAddress', toAddress);
  console.log('🔥', 'amount', amount.toString());
  let transferAmount = amount;
  if (typeof amount === 'string') {
    transferAmount = ethers.utils.parseEther(amount);
  }

  const contract = new ethers.Contract(tokenAddress, abi, getAccount(true));
  return await contract.transfer(toAddress, transferAmount);
}

module.exports = { loadTokenInfo, getTokenSymbol, getTokenBalance, transferToken };
