const { CHAIN, SWAP } = require('./constants');

const DEFAULT_ADDRESSES = {
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  HERO: '0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13',
  MATIC: '0x0000000000000000000000000000000000001010',
  ICE: '0x4A81f8796e0c6Ad4877A51C86693B0dE8093F2ef',
  UNI: '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
  AAVE: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
  SUSHI: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
  DINO: '0xAa9654BECca45B5BDFA5ac646c939C62b527D394',
  CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  PUPPY: '0x19983df692be8FA81c60fd27D6fc91E8928fA97a',
  MDCH: '0x2b0958d6e1c93f48f40b4b656d8BE7d565D1DDB7'
};

const MATIC_DEFAULTS = {
  USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  BUSD: '0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7',
  USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
  WETH: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
  WMATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  NATIVE_TOKEN: DEFAULT_ADDRESSES.MATIC
};

const BSC_DEFAULTS = {
  USDC: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  USDT: '0x55d398326f99059ff775485246999027b3197955',
  WETH: '0x2aab30a909748945d42c7d29d3cd44a5680cab1d'
};

const ADDRESSES_BY_SWAP = {
  PANCAKE: {
    BSC: {
      ...BSC_DEFAULTS,
      router: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
      factory: '0xca143ce32fe78f1f7019d7d551a6402fc5350c73',
      WETH_NATIVE: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' // WBNB on pancake
    }
  },
  SUSHI: {
    MATIC: {
      ...MATIC_DEFAULTS,
      router: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
      factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
      WETH_NATIVE: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' //WMATIC on sushi
    }
  },
  DFYN: {
    MATIC: {
      ...MATIC_DEFAULTS,
      router: '0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429',
      factory: '0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B',
      WETH_NATIVE: '0x4c28f48448720e9000907bc2611f73022fdce1fa' //WETH on dfyn
    }
  }
};

const addresses = { ...DEFAULT_ADDRESSES, ...ADDRESSES_BY_SWAP[SWAP][CHAIN] };

module.exports = addresses;
