const { ethers } = require('ethers');
const { NATIVE_TOKEN_SYMBOL } = require('../constants');
const { getAccount } = require('../wallet');

let retries = 0;

async function logNativeTokenBalance(retry = false) {
  if (!retry) {
    retries = 0;
  }

  try {
    const balance = await getAccount(true).getBalance();

    console.log(
      '💰',
      `Native token balance on main account: ${ethers.utils.formatEther(
        balance
      )} ${NATIVE_TOKEN_SYMBOL}`
    );
  } catch (e) {
    if (retries < 5) {
      retries = retries + 1;
      logNativeTokenBalance(true);
      return;
    }

    console.log('🔥', 'Failed to load account balance');
  }
}

module.exports = logNativeTokenBalance;
