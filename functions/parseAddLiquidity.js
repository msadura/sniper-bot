const ethers = require('ethers');

const abi = [
  'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline ) external returns (uint amountA, uint amountB, uint liquidity)'
];
const iface = new ethers.utils.Interface(abi);

function parseAddLiquidity(transaction) {
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

module.exports = parseAddLiquidity;
