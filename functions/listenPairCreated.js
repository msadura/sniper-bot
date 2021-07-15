const ethers = require('ethers');
const addresses = require('../addresses');
const getTokenNameByAddress = require('../utils/getTokenNameByAddress');
const { getAccount } = require('../wallet');

const getFactory = () => {
  return new ethers.Contract(
    addresses.factory,
    ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
    getAccount()
  );
};

function listenPairCreated(callback) {
  console.log('🔫   -->   Listening pair created events\n');

  getFactory().on('PairCreated', async (token0, token1, pairAddress) => {
    const token0Name = getTokenNameByAddress(token0);
    const token1Name = getTokenNameByAddress(token1);

    console.log(`
      New pair created
      =================
      token0: ${token0}${token0Name ? ` (${token0Name})` : ''}
      token1: ${token1}${token1Name ? ` (${token1Name})` : ''}
      pairAddress: ${pairAddress}
    `);

    if (callback) {
      callback(token0, token1, pairAddress);
    }
  });
}

module.exports = listenPairCreated;
