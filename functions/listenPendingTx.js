const { getProvider } = require('../provider');

let good = 0;
let bad = 0;

const usePublicApiForDetails = process.env.USE_PUBLIC_API;

function listenPendingTx(callback) {
  console.log('🔫   -->   Listening pending tx');
  getProvider('ws').on('pending', async tx => {
    const transaction = await getProvider(
      usePublicApiForDetails ? 'public' : 'http'
    ).getTransaction(tx);

    if (!transaction) {
      bad++;
      console.log('🔥', 'good tx', good, 'null tx', bad);
    } else {
      good++;
      console.log('🔫', 'good tx', good, 'null tx', bad);
    }

    callback && callback(transaction);
  });
}

module.exports = listenPendingTx;
