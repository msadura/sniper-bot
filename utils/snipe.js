const swapExactETHForTokens = require('../functions/swapExactETHForTokens');

async function snipe(tokenAddress) {
  const resultTx = await swapExactETHForTokens({
    amountIn: '0.1',
    amountOut: '0.01',
    token: tokenAddress,
    gwei: '3',
    gasLimit: 161499
  });

  console.info('✅ bought', resultTx);
}

module.exports = snipe;
