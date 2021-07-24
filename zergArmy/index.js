const { ethers } = require('ethers');
const { connectAndGetAccount, getAccount } = require('../wallet');
const {
  NATIVE_TOKEN_TRADE_AMOUNT,
  SNIPE_DEFAULT_GAS_PRICE,
  SNIPE_GAS_LIMIT
} = require('../constants');
const getGasValue = require('../functions/getGasValue');
const { snipe } = require('../utils/snipe');

let minions = null;
let loadingPromise = null;
let loadingPromiseResolve = null;
let loadingPromiseReject = null;

let snipingPromise = null;
let snipingPromiseResolve = null;

try {
  minions = require('./minions.json');
  if (!Array.isArray(minions) || !minions.length) {
    throw new Error();
  }
} catch (e) {
  throw 'Cannot load minions data. Disable zerg army or provide correct minions file. Aborting.';
}

// Testing - use only 1 account
minions = [minions[0], minions[1], minions[2]];

function setLoadingPromise() {
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
  setLoadingPromise();

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
  const amountIn = ethers.utils.parseEther(NATIVE_TOKEN_TRADE_AMOUNT);
  const approxGasValue = await getGasValue(SNIPE_GAS_LIMIT, SNIPE_DEFAULT_GAS_PRICE);
  const minBalance = amountIn.add(approxGasValue);

  return balance.gte(minBalance);
}

async function armMinion({ account }) {
  const amountIn = ethers.utils.parseEther(NATIVE_TOKEN_TRADE_AMOUNT);
  const approxGasValue = await getGasValue(SNIPE_GAS_LIMIT, SNIPE_DEFAULT_GAS_PRICE);
  const sendValue = amountIn.add(approxGasValue);
  console.log('🔥', 'feeding with', ethers.utils.formatEther(sendValue));

  const tx = await getAccount(true).sendTransaction({
    to: account.address,
    value: sendValue
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
  console.log('🔥', `Minion ${id} - funds returned`);
}

async function getFundsBack() {
  console.log('🔥', 'Getting funds back to main account...');

  for (const minion of minions) {
    try {
      if (!minion.account) {
        minion.account = connectAndGetAccount(minion.mnemonic);
      }
      await disarmMinion(minion);
    } catch (e) {
      console.log('🔥', e);
      console.log('🔥', `Error getting funds from minion id ${minion.id}`);
    }
  }

  console.log('🔥', 'All funds returned from minions.');
}

async function snipeCommand(snipeData) {
  if (snipingPromise) {
    return snipingPromise;
  }

  console.log('🔥', 'Sniping with armed minions...');
  setSnipingPromise();

  for (const minion of minions) {
    if (minion.isArmed) {
      snipeMinion(minion, snipeData);
    }
  }

  return snipingPromise;
}

async function snipeMinion(minion, snipeData) {
  minion.isSniping = true;
  const tx = await snipe({ ...snipeData, account: minion.account });
  if (tx) {
    console.info('✅', `Minion ${minion.id} sniped ${snipeData.tokenSymbol}! Tx: ${tx}`);
    // await disarmMinion(minion);
    // console.info('✅', `Minion ${minion.id} leftover funds returned`);
  } else {
    console.info('❌', `Minion ${minion.id} failed to snipe ${snipeData.tokenSymbol} :(`);
  }

  minion.isSniping = false;
  checkSnipingState();
}

function setSnipingPromise() {
  snipingPromise = new Promise(resolve => {
    snipingPromiseResolve = resolve;
  });
}

function clearSnipingPromise() {
  snipingPromise = null;
  snipingPromiseResolve = null;
}

function checkSnipingState() {
  const minionsSnipingCount = minions.filter(m => m.isSniping).length;

  if (minionsSnipingCount > 0) {
    return;
  }

  console.log('🔥', 'All minions finished sniping!');
  snipingPromiseResolve();
  clearSnipingPromise();
}

module.exports = { callToArms, getFundsBack, snipeCommand };
