const ethers = require('ethers');
const getTokenNameByAddress = require('../utils/getTokenNameByAddress');

const abi = [
  'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline ) external returns (uint amountA, uint amountB, uint liquidity)'
];
const iface = new ethers.utils.Interface(abi);

function parseAddLiquidity(tx) {
  let data = null;

  try {
    const txData = iface.parseTransaction(tx);
    // console.log('🔥', txData.args.tokenA);
    const { tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline } =
      txData.args;

    // data = {
    //   tokenA: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    // tokenB: '0x76bF0C28e604CC3fE9967c83b3C3F31c213cfE64',
    // amountADesired: BigNumber { _hex: '0x0713e94f785dcf84dd', _isBigNumber: true },
    // amountBDesired: BigNumber { _hex: '0x0a7577b9ffb91406ad', _isBigNumber: true },
    // amountAMin: BigNumber { _hex: '0x07056a84151979e40e', _isBigNumber: true },
    // amountBMin: BigNumber { _hex: '0x0a600c45d2ab4f4203', _isBigNumber: true },
    // to: '0x97296a9A2faFb55a0b49960CB1A5dF2A96F44747',
    // deadline: BigNumber { _hex: '0x60f8629e', _isBigNumber: true }
    // }

    data = {
      tokenA,
      tokenASymbol: getTokenNameByAddress(tokenA),
      tokenB,
      tokenBSymbol: getTokenNameByAddress(tokenB),
      amountADesired: amountADesired.toString(),
      amountBDesired: amountBDesired.toString(),
      amountAMin: amountAMin.toString(),
      amountBMin: amountBMin.toString(),
      to,
      deadline
    };

    console.log('🔥', data);
  } catch (e) {
    // this is not addLiquidity function
  }

  return data;
}

module.exports = parseAddLiquidity;
