const addresses = require('../addresses');
const { SNIPE_TOKEN_NAME } = require('../constants');
const snipe = require('./snipe');

function pairCreatedSnipeCb(token0, token1) {
  const snipeTokenAddress = addresses[SNIPE_TOKEN_NAME];

  if (
    token0.toLowerCase() === snipeTokenAddress?.toLowerCase() ||
    token1.toLowerCase() === snipeTokenAddress?.toLowerCase()
  ) {
    console.log(`✅ Headshot! $${SNIPE_TOKEN_NAME} pair created!`);
    snipe(snipeTokenAddress);
  }
}

module.exports = pairCreatedSnipeCb;
