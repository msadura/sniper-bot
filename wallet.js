const ethers = require('ethers');
const { MNEMONIC } = require('./constants');
const { getProvider } = require('./provider');

let account = null;
let httpAccount = null;

function connectAccount() {
  const provider = getProvider('ws');
  const wallet = ethers.Wallet.fromMnemonic(MNEMONIC);
  console.info('connecting accout...');

  try {
    account = wallet.connect(provider);
    httpAccount = wallet.connect(getProvider('http'));
  } catch (e) {
    console.log('🔥 account connect error', e);
  }
}

function getAccount(useHttApi) {
  if (useHttApi) {
    return httpAccount;
  }

  return account;
}

function connectAndGetAccount(mnemonic, useHttpApi) {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  return wallet.connect(getProvider(useHttpApi));
}

module.exports = { getAccount, connectAccount, connectAndGetAccount };
