const { ethers } = require('ethers');
const { NATIVE_TOKEN_SYMBOL } = require('../constants');
const { getAccount } = require('../wallet');

async function logNativeTokenBalance() {
  const balance = await getAccount(true).getBalance();

  console.log(
    '💰',
    `Native token balance on main account: ${ethers.utils.formatEther(
      balance
    )} ${NATIVE_TOKEN_SYMBOL}`
  );
}

module.exports = logNativeTokenBalance;
