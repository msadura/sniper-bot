const { getProvider } = require('../provider');

// let good = 0;
// let bad = 0;

function listenPendingTx(callback) {
  console.log('🔫   -->   Listening pending tx');
  const provider = getProvider();
  provider.on('pending', async tx => {
    const transaction = await provider.getTransaction(tx);

    // if (!transaction) {
    //   bad++;
    //   console.log('🔥', 'good tx', good, 'null tx', bad);
    // } else {
    //   good++;
    //   console.log('🔫', 'good tx', good, 'null tx', bad);
    // }

    callback && callback(transaction);
  });
}

module.exports = listenPendingTx;
