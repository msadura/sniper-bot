const { ethers } = require('ethers');
const { getProvider } = require('../provider');

async function getGasValue(gasLimit = '21000', gasPrice) {
  let price = gasPrice;
  if (!price) {
    price = await getProvider(true).getGasPrice();
  } else if (typeof price === 'string' || typeof price === 'number') {
    price = ethers.utils.parseUnits(price, 'gwei');
  }

  const limit = ethers.BigNumber.from(gasLimit);
  const gasValue = price.mul(limit);

  return gasValue;
}

module.exports = getGasValue;
