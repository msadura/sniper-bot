const addresses = require('../addresses');

function getTokenNameByAddress(address) {
  const token = Object.entries(addresses).find(t => t[1] === address);
  if (token) {
    return token[0];
  }
}

module.exports = getTokenNameByAddress;
