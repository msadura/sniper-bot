const handleAddLiquidity = require('./handleAddLiquidity');
const handleAddLiquidityETH = require('./handleAddLiquidityETH');

function handlePendingTransaction(tx) {
  const addLiquidityData = handleAddLiquidity(tx);
  const addLiquidityETHData = handleAddLiquidityETH(tx);

  if (addLiquidityData) {
    console.log('🔥', 'got add liquidity function');
    //TODO: run snipe logic
  }

  if (addLiquidityETHData) {
    console.log('🔥', 'got add liquidity ETH function');
    //TODO: run snipe logic
  }
}

module.exports = handlePendingTransaction;
