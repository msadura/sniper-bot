const swapExactETHForTokens = require('../functions/swapExactETHForTokens');

async function snipe(tokenAddress) {
  const resultTx = await swapExactETHForTokens({
    amountIn: '10',
    amountOut: '0',
    token: tokenAddress,
    gwei: '5',
    gasLimit: 161499
  });

  console.info('✅ bought', resultTx);
  return resultTx;
}

module.exports = snipe;
