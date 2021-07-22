const CHAIN = process.env.USE_CHAIN || 'BSC';
const SWAP = process.env.USE_SWAP || 'SUSHI';
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;
const MNEMONIC = process.env.MNEMONIC;
let SNIPE_TOKEN_NAMES = [];
const USE_API_SERVER = process.env.USE_API_SERVER;

try {
  SNIPE_TOKEN_NAMES = process.env.SNIPE_TOKEN_NAMES.split(',').map(n => n.trim().toUpperCase());
  // eslint-disable-next-line no-empty
} catch (e) {}

const SOCKETS = {
  BSC: process.env.MAINNET_WEBSOCKET_BSC,
  MATIC: process.env.MAINNET_WEBSOCKET_MATIC
};

const HTTP_API = {
  BSC: process.env.MAINNET_HTTP_BSC,
  MATIC: process.env.MAINNET_HTTP_MATIC
};

const MAINNET_WEBSOCKET = SOCKETS[CHAIN];
const MAINNET_API = HTTP_API[CHAIN];

console.log('🔥 RECIPIENT_ADDRESS: ', RECIPIENT_ADDRESS);
console.log('🔥 SNIPE_TOKEN_NAMES: ', SNIPE_TOKEN_NAMES);
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

if (!SNIPE_TOKEN_NAMES || !SNIPE_TOKEN_NAMES.length) {
  throw 'Set SNIPE_TOKEN_NAMES env variable!';
}

const CHART_URLS = {
  BSC: 'https://poocoin.app/tokens/',
  MATIC: 'https://polygon.poocoin.app/tokens/'
};

module.exports = {
  CHAIN,
  SWAP,
  MAINNET_WEBSOCKET,
  RECIPIENT_ADDRESS,
  MNEMONIC,
  MAINNET_API,
  SNIPE_TOKEN_NAMES,
  USE_API_SERVER,
  CHART_URLS
};
