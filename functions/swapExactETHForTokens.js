const ethers = require('ethers');
const addresses = require('../addresses');
const { RECIPIENT_ADDRESS } = require('../constants');
const areAdressesEqual = require('../utils/areAdressesEqual');
const getTokenNameByAddress = require('../utils/getTokenNameByAddress');
const { getAccount } = require('../wallet');

const getRouter = () => {
  return new ethers.Contract(
    addresses.router,
    [
      'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)'
    ],
    getAccount(true)
  );
};

const swapExactETHForTokens = async ({
  amountIn,
  amountOut,
  token,
  token1,
  gwei,
  gasLimit = null
}) => {
  const BNBAmount = ethers.utils.parseEther(amountIn).toHexString();
  const gasPrice = ethers.utils.parseUnits(gwei, 'gwei');
  const path = [addresses.WETH];
  if (token1 && !areAdressesEqual(token1, addresses.WETH)) {
    path.push(token1);
  }
  path.push(token);

  const tx = await getRouter().swapExactETHForTokens(
    ethers.utils.parseUnits(amountOut, 18), // Degen ape don't give a fuck about slippage, ethers.utils.parseUnits("0.26", 18)
    path,
    RECIPIENT_ADDRESS,
    Math.floor(Date.now() / 1000) + 60 * 2, // 2 minutes from now
    {
      gasPrice,
      gasLimit,
      value: BNBAmount
    }
  );
  console.log(`🧲 Buying $${getTokenNameByAddress(token)} with $WETH native for platform`);

  const receipt = await tx.wait();

  return receipt.transactionHash;
};

module.exports = swapExactETHForTokens;
