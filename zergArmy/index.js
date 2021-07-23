const { ethers } = require('ethers');
const addresses = require('../addresses');
const { connectAndGetAccount, getAccount } = require('../wallet');
const { getTokenBalance } = require('../functions/loadTokenInfo');
const { NATIVE_TOKEN_TRADE_AMOUNT } = require('../constants');
const getGasValue = require('../functions/getGasValue');

let minions = null;

try {
  minions = require('./minions.json');
  if (!Array.isArray(minions) || !minions.length) {
    throw new Error();
  }
} catch (e) {
  throw 'Cannot load minions data. Disable zerg army or provide correct minions file. Aborting.';
}

// Testing - use only 1 account
// minions = [minions[0]];

async function callToArms() {
  console.log('🔥', 'Preparing zerg army to fight...');
  for (const minion of minions) {
    try {
      const account = connectAndGetAccount(minion.mnemonic);
      const isArmed = await isArmedAccount(account.address);

      if (!isArmed) {
        await armAccount(account.address);
      }

      minion.account = account;
    } catch (e) {
      console.log('🔥', e);
      console.log('🔥', `Error connecting minion id ${minion.id}`);
    }
  }
}

async function isArmedAccount(address) {
  const balance = await getTokenBalance(addresses.NATIVE_TOKEN, address);
  console.log('🔥 minion balance:', ethers.utils.formatEther(balance));
  const minBalance = ethers.utils.parseEther(NATIVE_TOKEN_TRADE_AMOUNT);

  return balance.gte(minBalance);
}

async function armAccount(address) {
  const tx = await getAccount(true).sendTransaction({
    to: address,
    value: ethers.utils.parseEther(NATIVE_TOKEN_TRADE_AMOUNT)
  });
  await tx.wait();
}

async function disarmAccount(account) {
  const balance = await getTokenBalance(addresses.NATIVE_TOKEN, account.address);

  const gasValue = getGasValue();
  const returnBalance = balance.sub(gasValue);

  if (balance.lte(ethers.BigNumber.from('0'))) {
    console.log('🔥', 'no balance to get back');
    return;
  }

  const tx = await account.sendTransaction({
    to: getAccount(true).address,
    value: returnBalance
  });
  await tx.wait();
}

async function getFundsBack() {
  console.log('🔥', 'Getting funds back to main account...');
  for (const minion of minions) {
    try {
      const account = minion.account || connectAndGetAccount(minion.mnemonic);
      await disarmAccount(account);
    } catch (e) {
      console.log('🔥', e);
      console.log('🔥', `Error getting funds from minion id ${minion.id}`);
    }
  }
}

module.exports = { callToArms, getFundsBack };
