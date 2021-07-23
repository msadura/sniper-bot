const { ethers } = require('ethers');
const { getProvider } = require('../provider');

async function getGasValue(gasLimit = '21000', gasPrice) {
  let price = gasPrice;
  if (!price) {
    price = await getProvider(true).getGasPrice();
  }

  const limit = ethers.BigNumber.from(gasLimit);
  const gasValue = gasPrice.mul(limit);

  return gasValue;
}

module.exports = getGasValue;
