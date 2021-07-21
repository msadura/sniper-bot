const { getProvider } = require('../provider');

function listenPendingTx(callback) {
  console.log('🔫   -->   Listening pending tx');
  const provider = getProvider();
  provider.on('pending', async tx => {
    const transaction = await provider.getTransaction(tx);
    callback && callback(transaction);
  });
}

module.exports = listenPendingTx;
