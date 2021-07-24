const ethers = require('ethers');
const addresses = require('../addresses');
const { RECIPIENT_ADDRESS } = require('../constants');
const areAdressesEqual = require('../utils/areAdressesEqual');
const getTokenNameByAddress = require('../utils/getTokenNameByAddress');
const { getAccount } = require('../wallet');

const getRouter = account => {
  return new ethers.Contract(
    addresses.router,
    [
      'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
    ],
    account || getAccount(true)
  );
};

const swapExactETHForTokens = async ({
  account,
  amountIn,
  amountOut,
  token,
  pairedToken,
  gasPrice,
  gasLimit = null
}) => {
  const WETHAmount = ethers.utils.parseEther(amountIn).toHexString();
  const gasPriceGwei = ethers.utils.parseUnits(gasPrice, 'gwei');
  const path = [addresses.WETH_NATIVE];
  if (pairedToken && !areAdressesEqual(pairedToken, addresses.WETH_NATIVE)) {
    path.push(pairedToken);
  }
  path.push(token);

  const tx = await getRouter(account).swapExactETHForTokens(
    ethers.utils.parseEther(amountOut),
    path,
    RECIPIENT_ADDRESS,
    Math.floor(Date.now() / 1000) + 60 * 2, // 2 minutes from now
    {
      gasPrice: gasPriceGwei,
      gasLimit,
      value: WETHAmount
    }
  );
  console.log(`🧲 Buying $${getTokenNameByAddress(token)} with $WETH native for platform`);

  const receipt = await tx.wait();

  return receipt.transactionHash;
};

module.exports = swapExactETHForTokens;
