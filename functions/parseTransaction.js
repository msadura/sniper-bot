const parseAddLiquidity = require('./parseAddLiquidity');
const parseAddLiquidityETH = require('./parseAddLiquidityETH');

function parseTransaction(tx) {
  const addLiquidityData = parseAddLiquidity(tx);
  const addLiquidityETHData = parseAddLiquidityETH(tx);

  if (addLiquidityData) {
    console.log('🔥', 'got add liquidity function');
  }

  if (addLiquidityETHData) {
    console.log('🔥', 'got add liquidity ETH function');
  }
}

module.exports = parseTransaction;
