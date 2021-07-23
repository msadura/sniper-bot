const fs = require('fs');
const ethers = require('ethers');

const addressBookFile = './snipeMinions/minions.json';
const numberOfMinions = 10;

function generateMinions() {
  try {
    const content = fs.readFileSync(addressBookFile, 'utf8');
    if (content) {
      console.error(
        '🔥',
        'minions.json is not empty! If youac are sure you want to override it, remove file manually.'
      );
      return;
    }
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }

  try {
    const minionsData = Array.from(Array(numberOfMinions).keys()).map(id => generateAccount(id));
    fs.writeFileSync(addressBookFile, JSON.stringify(minionsData));
    console.log('🔥', `Generated ${numberOfMinions} wallets and saved mnemonics to minions.json`);
  } catch (e) {
    console.log('🔥', e);
  }
}

function generateAccount(internalId) {
  const wallet = ethers.Wallet.createRandom();

  return {
    id: internalId,
    mnemonic: wallet.mnemonic.phrase
  };
}

generateMinions();
