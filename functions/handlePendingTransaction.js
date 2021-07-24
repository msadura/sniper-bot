const handleSnipeSignal = require('../utils/handleSnipeSignal');
const handleAddLiquidity = require('./handleAddLiquidity');
const handleAddLiquidityETH = require('./handleAddLiquidityETH');

async function handlePendingTransaction(tx) {
  const addLiquidityData = await handleAddLiquidity(tx);
  const addLiquidityETHData = await handleAddLiquidityETH(tx);

  if (addLiquidityData) {
    console.log('🔥', 'got add liquidity function');
    handleSnipeSignal(addLiquidityData);
  }

  if (addLiquidityETHData) {
    console.log('🔥', 'got add liquidity ETH function');
    handleSnipeSignal(addLiquidityETHData);
  }
}

module.exports = handlePendingTransaction;
