const ethers = require('ethers');
const addresses = require('../addresses');
const { SNIPE_TOKEN_NAMES } = require('../constants');
const areAdressesEqual = require('../utils/areAdressesEqual');
const getTokenNameByAddress = require('../utils/getTokenNameByAddress');
const { getTokenBalance } = require('./loadTokenInfo');

const abi = [
  'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline ) external returns (uint amountA, uint amountB, uint liquidity)'
];
const iface = new ethers.utils.Interface(abi);

async function handleAddLiquidity(tx) {
  let data = null;

  try {
    const txData = iface.parseTransaction(tx);
    // console.log('🔥', txData.args.tokenA);
    const { tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline } =
      txData.args;

    // txData = {
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
      amountADesired: amountADesired,
      amountBDesired: amountBDesired,
      amountAMin: amountAMin,
      amountBMin: amountBMin,
      to,
      deadline
    };

    const isSignal = await isTradeSignal(tx, data);

    return isSignal ? data : null;
  } catch (e) {
    // this is not addLiquidity function
  }

  return data;
}

async function isTradeSignal(tx, txData) {
  const snipeTokenAddresses = SNIPE_TOKEN_NAMES.map(n => addresses[n]);
  const { tokenA, tokenB, amountAMin, amountBMin } = txData;

  let isSnipeToken = false;
  let tokenAddress = tokenA;
  let pairTokenAddress = tokenB;
  let amountTokenMin = amountBMin;
  let amountPairTokenMin = amountAMin;

  if (snipeTokenAddresses.find(t => areAdressesEqual(tokenB, t))) {
    tokenAddress = tokenB;
    pairTokenAddress = tokenA;
    amountTokenMin = amountBMin;
    amountPairTokenMin = amountAMin;
    isSnipeToken = true;
  }

  if (snipeTokenAddresses.find(t => areAdressesEqual(tokenA, t))) {
    isSnipeToken = true;
  }

  if (!isSnipeToken) {
    return false;
  }

  const senderSnipeTokenBalance = await getTokenBalance(tokenAddress, tx.from);
  if (senderSnipeTokenBalance.lt(amountTokenMin)) {
    // sender does not have supposed snipe token balance - fake addition
    console.log('🔴', 'Sender does not have enough tokens - fake lp addition');

    return false;
  }

  //TODO - add checking min liqidity addition
  // console.log('🔥', 'amount paired', ethers.utils.formatEther(amountPairTokenMin));

  console.log(
    '🟢',
    `LP addition conditions met. ${ethers.utils.formatEther(
      amountTokenMin
    )} ${getTokenNameByAddress(tokenAddress)} - ${ethers.utils.formatEther(
      amountPairTokenMin
    )} ${getTokenNameByAddress(pairTokenAddress)}`
  );

  return true;
}

module.exports = handleAddLiquidity;
