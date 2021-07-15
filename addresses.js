const { CHAIN, SWAP } = require('./constants');

const DEFAULT_ADDRESSES = {
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  HERO: '0xD40bEDb44C081D2935eebA6eF5a3c8A31A1bBE13',
  MATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  ICE: '0x4A81f8796e0c6Ad4877A51C86693B0dE8093F2ef',
  UNI: '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
  AAVE: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
  SUSHI: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
  DINO: '0xAa9654BECca45B5BDFA5ac646c939C62b527D394'
};

const ADDRESSES_BY_SWAP = {
  PANCAKE: {
    BSC: {
      router: '0x10ed43c718714eb63d5aa57b78b54704e256024e',
      factory: '0xca143ce32fe78f1f7019d7d551a6402fc5350c73',
      WETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c' // WBNB on pancake
    }
  },
  SUSHI: {
    MATIC: {
      router: '0x1b02da8cb0d097eb8d57a175b88c7d8b47997506',
      factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
      WETH: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
    }
  },
  DFYN: {
    MATIC: {
      router: '0xA102072A4C07F06EC3B4900FDC4C7B80b6c57429',
      factory: '0xE7Fb3e833eFE5F9c441105EB65Ef8b261266423B',
      WETH: '0x4c28f48448720e9000907bc2611f73022fdce1fa'
    }
  }
};

const addresses = { ...DEFAULT_ADDRESSES, ...ADDRESSES_BY_SWAP[SWAP][CHAIN] };

module.exports = addresses;
