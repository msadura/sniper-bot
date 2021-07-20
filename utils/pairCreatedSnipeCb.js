const addresses = require('../addresses');
const { SNIPE_TOKEN_NAME } = require('../constants');
const areAdressesEqual = require('./areAdressesEqual');
const snipe = require('./snipe');

function pairCreatedSnipeCb(token0, token1) {
  const snipeTokenAddress = addresses[SNIPE_TOKEN_NAME];
  let pairTokenAddress = token0;
  let isSnipeToken = false;

  if (areAdressesEqual(token0, snipeTokenAddress)) {
    pairTokenAddress = token1;
    isSnipeToken = true;
  }

  if (areAdressesEqual(token1, snipeTokenAddress)) {
    isSnipeToken = true;
  }

  if (isSnipeToken) {
    console.log(`✅ Headshot! $${SNIPE_TOKEN_NAME} pair created!`);
    snipe(snipeTokenAddress, pairTokenAddress);
  }
}

module.exports = pairCreatedSnipeCb;
