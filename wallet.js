const ethers = require('ethers');
const { MNEMONIC } = require('./constants');
const { getProvider } = require('./provider');

let account = null;
let httpAccount = null;

function connectAccount() {
  const provider = getProvider();
  const wallet = ethers.Wallet.fromMnemonic(MNEMONIC);
  console.info('connecting accout...');

  try {
    account = wallet.connect(provider);
    httpAccount = wallet.connect(getProvider(true));
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

module.exports = { getAccount, connectAccount };
