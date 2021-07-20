const swapExactETHForTokens = require('../functions/swapExactETHForTokens');

let retries = 0;
async function snipe(tokenAddress, token1Address, isRetry) {
  try {
    if (!isRetry) {
      retries = 0;
    }

    const resultTx = await swapExactETHForTokens({
      amountIn: '0.1',
      amountOut: '0',
      token: tokenAddress,
      token1: token1Address,
      gwei: '10',
      gasLimit: 161499
    });

    console.info('✅ bought', resultTx);
    return resultTx;
  } catch (e) {
    if (retries < 4) {
      console.log('🔥', 'Retrying snipe purchase');
      retries += 1;
      return snipe(tokenAddress, token1Address, true);
    } else {
      console.log('🔥', `Could not purchase token ${tokenAddress}`);
      console.log('🔥', e);
    }
  }
}

module.exports = snipe;
