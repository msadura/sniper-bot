const ethers = require('ethers');
const addresses = require('../addresses');
const { CHART_URLS, CHAIN } = require('../constants');
const areAdressesEqual = require('../utils/areAdressesEqual');
const getTokenNameByAddress = require('../utils/getTokenNameByAddress');
const { getAccount } = require('../wallet');
const { getTokenSymbol } = require('./loadTokenInfo');

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
    logCreatedPairAsync(token0, token1, pairAddress);

    if (callback) {
      callback(token0, token1, pairAddress);
    }
  });
}

async function logCreatedPairAsync(token0, token1, pairAddress) {
  let token0Symbol = getTokenNameByAddress(token0);
  let token1Symbol = getTokenNameByAddress(token1);
  let linkToken0 = false;
  let linkToken1 = false;

  if (!areAdressesEqual(token0, addresses.WETH_NATIVE)) {
    linkToken0 = true;
  }

  if (!areAdressesEqual(token1, addresses.WETH_NATIVE)) {
    linkToken1 = true;
  }

  if (!token0Symbol) {
    try {
      token0Symbol = await getTokenSymbol(token0);
      // eslint-disable-next-line no-empty
    } catch {
      console.log('🔥', 'Handled getTokenSymbol exception');
    }
  }

  if (!token1Symbol) {
    try {
      token1Symbol = await getTokenSymbol(token1);
      // eslint-disable-next-line no-empty
    } catch {
      console.log('🔥', 'Handled getTokenSymbol exception');
    }
  }

  console.log('🔥', `New pair created address: ${pairAddress}`);
  console.log(`   $${token0Symbol} - ${token0}`);
  if (linkToken0) {
    console.log(`   $${token0Symbol} chart - ${CHART_URLS[CHAIN]}${token0}`);
  }

  console.log(`   $${token1Symbol} - ${token1}`);
  if (linkToken1) {
    console.log(`   $${token1Symbol} chart - ${CHART_URLS[CHAIN]}${token1}`);
  }
  console.log('🔥', '============');
}

module.exports = listenPairCreated;
