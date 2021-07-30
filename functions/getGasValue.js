const { ethers } = require('ethers');
const { getProvider } = require('../provider');

async function getGasValue(gasLimit = 21000, gasPrice) {
  let price = gasPrice;
  if (!price) {
    price = await getProvider('http').getGasPrice();
    console.log('🔥', 'Loaded gas price', ethers.utils.formatUnits(price, 'gwei'));
  } else if (typeof price === 'string' || typeof price === 'number') {
    price = ethers.utils.parseUnits(price, 'gwei');
  }

  const limit = ethers.BigNumber.from(gasLimit);
  const gasValue = price.mul(limit);

  return { gasValue, gasPrice: price, gasLimit };
}

module.exports = getGasValue;
