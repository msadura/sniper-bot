const CHAIN = process.env.USE_CHAIN || 'BSC';
const SWAP = process.env.USE_SWAP || 'SUSHI';
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS;
const MNEMONIC = process.env.MNEMONIC;
const USE_API_SERVER = process.env.USE_API_SERVER;
const USE_ZERG_ARMY = process.env.USE_ZERG_ARMY;

const NATIVE_TOKENS_TRADE_AMOUNT = {
  BSC: '0.065', //BNB ~20$
  MATIC: '0.1' //MATIC
};

const DEFAULT_GAS_PRICES = {
  BSC: '12',
  MATIC: '2'
};

// Snipe settings
const SNIPE_GAS_LIMIT = 768468;
const DEFAULT_GAS_PRICE = DEFAULT_GAS_PRICES[CHAIN];

const SNIPE_TOKENS_CONFIG = {
  DINO: {
    amountOut: '0',
    minLiq: null
  },
  LUCKYBDOGE: {
    amountMin: '10000'
  }
};

// Put names of trigger tokens here or in env variable
let SNIPE_TOKEN_NAMES = ['NETPLIX', 'PLYRS', 'LUCKYBDOGE', 'FAN'];

try {
  const snipeTokensEnv = process.env.SNIPE_TOKEN_NAMES.split(',').map(n => n.trim().toUpperCase());
  if (snipeTokensEnv.length) {
    SNIPE_TOKEN_NAMES = snipeTokensEnv;
  }
  // eslint-disable-next-line no-empty
} catch (e) {}

const NATIVE_TOKEN = {
  BSC: 'BNB',
  MATIC: 'MATIC'
};

const MAINNET_WEBSOCKET = process.env[`MAINNET_WEBSOCKET_${CHAIN}`];
const MAINNET_API = process.env[`MAINNET_HTTP_${CHAIN}`];
const NATIVE_TOKEN_SYMBOL = NATIVE_TOKEN[CHAIN];
const NATIVE_TOKEN_TRADE_AMOUNT = NATIVE_TOKENS_TRADE_AMOUNT[CHAIN];

console.log('ℹ️  RECIPIENT_ADDRESS: ', RECIPIENT_ADDRESS);
console.log('ℹ️  SNIPE_TOKEN_NAMES: ', SNIPE_TOKEN_NAMES);
console.log('ℹ️  USE_API_SERVER: ', USE_API_SERVER);
console.log('ℹ️  CHAIN: ', CHAIN);
console.log('ℹ️  SWAP: ', SWAP);

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
    '⚠️ ',
    'Snipe token symbols not set. Liquidity sniping will not work, but you can snipe via api.'
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
  DEFAULT_GAS_PRICE
};
