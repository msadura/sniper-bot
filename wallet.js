const ethers = require('ethers');
const { MNEMONIC } = require('./constants');
const { getProvider } = require('./provider');

let account = null;

function connectAccount() {
  const provider = getProvider();
  const wallet = ethers.Wallet.fromMnemonic(MNEMONIC);
  console.info('connecting accout...');
  account = wallet.connect(provider);
}

function getAccount() {
  return account;
}

module.exports = { getAccount, connectAccount };
