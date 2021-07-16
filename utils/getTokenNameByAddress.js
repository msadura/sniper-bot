const addresses = require('../addresses');
const areAdressesEqual = require('./areAdressesEqual');

function getTokenNameByAddress(address) {
  const token = Object.entries(addresses).find(t => areAdressesEqual(t[1], address));
  if (token) {
    return token[0];
  }
}

module.exports = getTokenNameByAddress;
