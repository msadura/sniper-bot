const ethers = require('ethers');

const abi = [
  'function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)'
];
const iface = new ethers.utils.Interface(abi);

function parseAddLiquidityETH(transaction) {
  let data = null;

  try {
    const txData = iface.parseTransaction(transaction);
    console.log('🔥', txData);
    data = txData;
    // prepare data object
  } catch (e) {
    // this is not addLiquidity function
  }

  return data;
}

module.exports = parseAddLiquidityETH;
