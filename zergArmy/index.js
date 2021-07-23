const { ethers } = require('ethers');
const { connectAndGetAccount, getAccount } = require('../wallet');
const { NATIVE_TOKEN_TRADE_AMOUNT } = require('../constants');
const getGasValue = require('../functions/getGasValue');

let minions = null;
let loadingPromise = null;
let loadingPromiseResolve = null;
let loadingPromiseReject = null;

try {
  minions = require('./minions.json');
  if (!Array.isArray(minions) || !minions.length) {
    throw new Error();
  }
} catch (e) {
  throw 'Cannot load minions data. Disable zerg army or provide correct minions file. Aborting.';
}

// Testing - use only 1 account
minions = [minions[0]];

function setLoadinPromise() {
  loadingPromise = new Promise((resolve, reject) => {
    loadingPromiseResolve = resolve;
    loadingPromiseReject = reject;
  });
}

function checkReadyState() {
  const readyMinionsCount = minions.filter(m => m.isArmed).length;

  if (readyMinionsCount === minions.length) {
    console.log('🔥', 'All minions ready to snipe!');
    loadingPromiseResolve();
    return;
  }

  if (minions.some(m => m.failedToLoad)) {
    loadingPromiseReject('Error during minions load. Aborting.');
  }
}

async function callToArms() {
  console.log('🔥', 'Preparing zerg army to fight...');
  setLoadinPromise();

  for (const minion of minions) {
    prepareMinion(minion);
  }

  return loadingPromise;
}

async function prepareMinion(minion) {
  if (!('connectRetries' in minion)) {
    minion.connectRetries = 0;
  }

  try {
    minion.account = connectAndGetAccount(minion.mnemonic);
    const isArmed = await isArmedMinion(minion);

    if (!isArmed) {
      await armMinion(minion);
    }

    minion.isArmed = true;
  } catch (e) {
    if (minion.connectRetries < 3) {
      console.log('🔥', `Retrying connecting minion ${minion.id}`);
      minion.connectRetries = minion.connectRetries + 1;
      prepareMinion(minion);
      return;
    }

    console.log('🔥', e);
    console.log('🔥', `Error connecting minion id ${minion.id}`);
  } finally {
    checkReadyState();
  }
}

async function isArmedMinion({ id, account }) {
  const balance = await account.getBalance();
  console.log(`🔥 minion ${id} balance:`, ethers.utils.formatEther(balance));
  const minBalance = ethers.utils.parseEther(NATIVE_TOKEN_TRADE_AMOUNT);

  return balance.gte(minBalance);
}

async function armMinion({ account }) {
  const tx = await getAccount(true).sendTransaction({
    to: account.address,
    // TODO - calculate and add gasValue for buy transactions
    value: ethers.utils.parseEther(NATIVE_TOKEN_TRADE_AMOUNT)
  });
  await tx.wait();
}

async function disarmMinion({ id, account }) {
  const balance = await account.getBalance();
  const gasValue = await getGasValue();
  const returnBalance = balance.sub(gasValue);

  if (returnBalance.lte(ethers.BigNumber.from('0'))) {
    console.log('🔥', `Minon ${id} - no balance to get back`);
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
      if (!minion.account) {
        minion.account = connectAndGetAccount(minion.mnemonic);
      }
      await disarmMinion(minion);
      console.log('🔥', `Minion ${minion.id} - fundss returned`);
    } catch (e) {
      console.log('🔥', e);
      console.log('🔥', `Error getting funds from minion id ${minion.id}`);
    }

    console.log('🔥', 'All funds returned from minions.');
  }
}

module.exports = { callToArms, getFundsBack };
