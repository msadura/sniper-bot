const ethers = require('ethers');
const areAdressesEqual = require('../utils/areAdressesEqual');
const getTokenNameByAddress = require('../utils/getTokenNameByAddress');
const { getTokenBalance } = require('./loadTokenInfo');
const { SNIPE_TOKEN_NAMES } = require('../constants');
const addresses = require('../addresses');

const abi = [
  'function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)'
];
const iface = new ethers.utils.Interface(abi);

async function handleAddLiquidity(tx) {
  let data = null;

  try {
    const txData = iface.parseTransaction(tx);
    const { token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline } = txData.args;

    // prepare data object
    // token: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    // amountTokenDesired: BigNumber { _hex: '0x0fb45b44', _isBigNumber: true },
    // amountTokenMin: BigNumber { _hex: '0x0f943193', _isBigNumber: true },
    // amountETHMin: BigNumber { _hex: '0x0f2c3029286dfe7512', _isBigNumber: true },
    // to: '0xCD854305ff2E6A5eA89f03f89728C8672e1ea380',
    // deadline: BigNumber { _hex: '0x60f86904', _isBigNumber: true }

    data = {
      token,
      tokenSymbol: getTokenNameByAddress(token),
      amountTokenDesired,
      amountTokenMin,
      amountETHMin,
      to,
      deadline
    };

    // console.log('🔥 addLiquidityETH data', data);
    const isSignal = await isTradeSignal(tx, data);

    return isSignal ? { ...data, gasPrice: ethers.utils.formatUnits(tx.gasPrice, 'gwei') } : null;
  } catch (e) {
    // this is not addLiquidity function
  }

  return data;
}

async function isTradeSignal(tx, txData) {
  const snipeTokenAddresses = SNIPE_TOKEN_NAMES.map(n => addresses[n]);
  const { token, amountTokenMin, amountETHMin } = txData;

  const isSnipeToken = snipeTokenAddresses.find(t => areAdressesEqual(token, t));

  if (!isSnipeToken) {
    return false;
  }

  const senderSnipeTokenBalance = await getTokenBalance(token, tx.from);
  if (senderSnipeTokenBalance.lt(amountTokenMin)) {
    // sender does not have supposed snipe token balance - fake addition
    console.log('🔴', 'Sender does not have enough tokens - fake lp addition');

    return false;
  }

  //TODO - add checking min liqidity addition
  // console.log('🔥', 'amount paired', ethers.utils.formatEther(amountPairTokenMin));

  console.log(
    '🟢',
    `LP addition ETH conditions met. ${ethers.utils.formatEther(
      amountTokenMin
    )} ${getTokenNameByAddress(token)} - ${ethers.utils.formatEther(amountETHMin)} ETH`
  );

  return true;
}

module.exports = handleAddLiquidity;
