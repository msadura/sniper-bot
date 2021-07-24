const { ethers } = require('ethers');
const {
  SNIPE_GAS_LIMIT,
  NATIVE_TOKEN_TRADE_AMOUNT,
  SNIPE_DEFAULT_GAS_PRICE,
  SNIPE_TOKENS_AMOUNT_OUT
} = require('../constants');
const getGasValue = require('../functions/getGasValue');
const swapExactETHForTokens = require('../functions/swapExactETHForTokens');

let retries = 0;
async function snipe(params) {
  const {
    token,
    tokenSymbol,
    pairedToken,
    isRetry,
    amountIn: amountInParam,
    gasLimit = SNIPE_GAS_LIMIT,
    gasPrice = SNIPE_DEFAULT_GAS_PRICE,
    account
  } = params;

  try {
    if (!isRetry) {
      retries = 0;
    }
    let amountIn = amountInParam;
    if (!amountIn) {
      amountIn = await calculateSnipeAmountIn(params);
    }
    const amountOut = SNIPE_TOKENS_AMOUNT_OUT[tokenSymbol] || '0';

    console.log('🔫', 'Snipe shot params:', { ...params, amountIn, amountOut });

    const resultTx = await swapExactETHForTokens({
      amountIn,
      amountOut,
      token,
      pairedToken,
      gasPrice,
      gasLimit,
      account
    });

    console.info('✅ bought', resultTx);
    return resultTx;
  } catch (e) {
    if (retries < 4) {
      console.log('🔥', 'Retrying snipe purchase');
      retries += 1;
      const retryParams = { ...params, isRetry: true };
      return snipe(retryParams);
    } else {
      console.log('🔥', `Could not purchase token ${token}`);
      console.log('🔥', e);
    }
  }
}

async function calculateSnipeAmountIn(snipeData, account) {
  const gasPrice = snipeData.gasPrice;
  const gasValue = getGasValue(SNIPE_GAS_LIMIT, gasPrice);
  const balance = await account.getBalane();
  const availableBalance = balance.sub(gasValue);
  let amountIn = ethers.utils.parseEther(NATIVE_TOKEN_TRADE_AMOUNT);

  // if account does not have balance to purchase full
  // amount we want, take all available funds
  if (availableBalance.lt(amountIn)) {
    amountIn = availableBalance;
  }

  return amountIn;
}

module.exports = { snipe, calculateSnipeAmountIn };
