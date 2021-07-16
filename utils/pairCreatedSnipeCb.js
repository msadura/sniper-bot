const addresses = require('../addresses');
const { SNIPE_TOKEN_NAME } = require('../constants');
const areAdressesEqual = require('./areAdressesEqual');
const snipe = require('./snipe');

function pairCreatedSnipeCb(token0, token1) {
  const snipeTokenAddress = addresses[SNIPE_TOKEN_NAME];

  if (areAdressesEqual(token0, snipeTokenAddress) || areAdressesEqual(token1, snipeTokenAddress)) {
    console.log(`✅ Headshot! $${SNIPE_TOKEN_NAME} pair created!`);
    snipe(snipeTokenAddress);
  }
}

module.exports = pairCreatedSnipeCb;
