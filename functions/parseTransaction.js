const parseAddLiquidity = require('./parseAddLiquidity');
const parseAddLiquidityETH = require('./parseAddLiquidityETH');

function parseTransaction(transaction) {
  const addLiquidityData = parseAddLiquidity(transaction);
  const addLiquidityETHData = parseAddLiquidityETH(transaction);

  if (addLiquidityData) {
    console.log('🔥', 'got add liquidity function');
  }

  if (addLiquidityETHData) {
    console.log('🔥', 'got add liquidity ETH function');
  }
}

module.exports = parseTransaction;
