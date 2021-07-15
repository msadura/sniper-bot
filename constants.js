const CHAIN = process.env.USE_CHAIN || 'BSC';
const SWAP = process.env.USE_SWAP || 'SUSHI';
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;
const MNEMONIC = process.env.MNEMONIC;

const SOCKETS = {
  BSC: process.env.MAINNET_WEBSOCKET_BSC,
  MATIC: process.env.MAINNET_WEBSOCKET_MATIC
};

const API = {
  BSC: process.env.MAINNET_API_BSC,
  MATIC: process.env.MAINNET_API_MATIC
};

const MAINNET_WEBSOCKET = SOCKETS[CHAIN];
const MAINNET_API = API[CHAIN];

console.log('🔥 RECIPIENT_ADDRESS: ', RECIPIENT_ADDRESS);
console.log('🔥 CHAIN: ', CHAIN);
console.log('🔥 SWAP: ', SWAP);

if (!RECIPIENT_ADDRESS) {
  throw 'Set RECIPIENT_ADDRESS env variable!';
}

if (!CHAIN) {
  throw 'Set CHAIN env variable!';
}

if (!SWAP) {
  throw 'Set SWAP env variable!';
}

if (!MNEMONIC) {
  throw 'Set MNEMONIC env variable!';
}

module.exports = {
  CHAIN,
  SWAP,
  MAINNET_WEBSOCKET,
  RECIPIENT_ADDRESS,
  MNEMONIC,
  MAINNET_API
};
