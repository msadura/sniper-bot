const handleSnipeSignal = require('../utils/handleSnipeSignal');
const handleAddLiquidity = require('./handleAddLiquidity');
const handleAddLiquidityETH = require('./handleAddLiquidityETH');

async function handlePendingTransaction(tx) {
  const addLiquidityData = await handleAddLiquidity(tx);
  const addLiquidityETHData = await handleAddLiquidityETH(tx);

  if (addLiquidityData) {
    console.log('🟢 add liquidity data', addLiquidityData);
    handleSnipeSignal(addLiquidityData);
  }

  if (addLiquidityETHData) {
    console.log('🟢 add liquidity ETH data', addLiquidityETHData);
    handleSnipeSignal(addLiquidityETHData);
  }
}

module.exports = handlePendingTransaction;
