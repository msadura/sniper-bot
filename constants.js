const CHAIN = process.env.USE_CHAIN || 'BSC';
const SWAP = process.env.USE_SWAP || 'SUSHI';
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;
const MNEMONIC = process.env.MNEMONIC;
const SNIPE_TOKEN_NAME = process.env.SNIPE_TOKEN_NAME;
const USE_API_SERVER = process.env.USE_API_SERVER;

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
console.log('🔥 SNIPE_TOKEN_NAME: ', SNIPE_TOKEN_NAME);
console.log('🔥 USE_API_SERVER: ', USE_API_SERVER);
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

if (!SNIPE_TOKEN_NAME) {
  throw 'Set SNIPE_TOKEN_NAME env variable!';
}

module.exports = {
  CHAIN,
  SWAP,
  MAINNET_WEBSOCKET,
  RECIPIENT_ADDRESS,
  MNEMONIC,
  MAINNET_API,
  SNIPE_TOKEN_NAME,
  USE_API_SERVER
};
