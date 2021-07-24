const CHAIN = process.env.USE_CHAIN || 'BSC';
const SWAP = process.env.USE_SWAP || 'SUSHI';
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;
const MNEMONIC = process.env.MNEMONIC;
const USE_API_SERVER = process.env.USE_API_SERVER;
const USE_ZERG_ARMY = false;
const NATIVE_TOKEN_TRADE_AMOUNT = '0.1';

// Snipe settings
const SNIPE_GAS_LIMIT = 161499;
const SNIPE_DEFAULT_GAS_PRICE = '2';

const SNIPE_TOKENS_CONFIG = {
  DINO: {
    amountOut: '0',
    minLiq: null
  },
  ICE: {
    minOut: '0',
    minLiq: null
  }
};

// Put names of trigger tokens here or in env variable
let SNIPE_TOKEN_NAMES = [];

try {
  const snipeTokensEnv = process.env.SNIPE_TOKEN_NAMES.split(',').map(n => n.trim().toUpperCase());
  if (snipeTokensEnv.length) {
    SNIPE_TOKEN_NAMES = snipeTokensEnv;
  }
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

const NATIVE_TOKEN = {
  BSC: 'BNB',
  MATIC: 'MATIC'
};

const MAINNET_WEBSOCKET = SOCKETS[CHAIN];
const MAINNET_API = HTTP_API[CHAIN];
const NATIVE_TOKEN_SYMBOL = NATIVE_TOKEN[CHAIN];

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
  console.warn(
    '⚠️',
    ' Snipe token symbols not set. Liquidity sniping will not work, but you can snipe via api.'
  );
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
  CHART_URLS,
  USE_ZERG_ARMY,
  NATIVE_TOKEN_TRADE_AMOUNT,
  NATIVE_TOKEN_SYMBOL,
  SNIPE_GAS_LIMIT,
  SNIPE_TOKENS_CONFIG,
  SNIPE_DEFAULT_GAS_PRICE
};
