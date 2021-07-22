const addresses = require('../addresses');
const { SNIPE_TOKEN_NAMES } = require('../constants');
const areAdressesEqual = require('./areAdressesEqual');
const getTokenNameByAddress = require('./getTokenNameByAddress');
const snipe = require('./snipe');

function pairCreatedSnipeCb(token0, token1) {
  const snipeTokenAddresses = SNIPE_TOKEN_NAMES.map(n => addresses[n]);
  let tokenAddress = token1;
  let pairTokenAddress = token0;
  let snipeTokenName = '';
  let isSnipeToken = false;

  if (snipeTokenAddresses.find(t => areAdressesEqual(token0, t))) {
    pairTokenAddress = token1;
    tokenAddress = token0;
    snipeTokenName = getTokenNameByAddress(tokenAddress);
    isSnipeToken = true;
  }

  if (snipeTokenAddresses.find(t => areAdressesEqual(token1, t))) {
    isSnipeToken = true;
  }

  if (isSnipeToken) {
    console.log(`✅ Headshot! $${snipeTokenName} pair created!`);
    snipe(tokenAddress, pairTokenAddress);
  }
}

module.exports = pairCreatedSnipeCb;
