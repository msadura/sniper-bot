const handleAddLiquidity = require('./handleAddLiquidity');
const handleAddLiquidityETH = require('./handleAddLiquidityETH');

async function handlePendingTransaction(tx) {
  const addLiquidityData = await handleAddLiquidity(tx);
  const addLiquidityETHData = await handleAddLiquidityETH(tx);

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
