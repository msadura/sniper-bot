const { USE_ZERG_ARMY } = require('../constants');
const handlePendingTransaction = require('../functions/handlePendingTransaction');
const listenPendingTx = require('../functions/listenPendingTx');
const { connectProvider } = require('../provider');
const { connectAccount } = require('../wallet');
const logNativeTokenBalance = require('./logNativeTokenBalance');

async function connectSniper() {
  const onConnect = async () => {
    connectAccount();
    if (USE_ZERG_ARMY) {
      // await callToArms();
    }

    // await getFundsBack();
    logNativeTokenBalance();

    // Remove pairCreatedSnipeCb if you do not want real purchase
    // listenPairCreated(pairCreatedSnipeCb);
    listenPendingTx(handlePendingTransaction);
  };
  console.log('🔥 oc', onConnect);
  await connectProvider(onConnect);
}

module.exports = connectSniper;
