const { getProvider } = require('../provider');
const areAddressesEqual = require('../utils/areAdressesEqual');

let good = 0;
let bad = 0;
const logStats = false;

const usePublicApiForDetails = process.env.USE_PUBLIC_API;

function listenPendingTx(callback) {
  console.log('ð«   -->   Listening pending tx');
  getProvider('ws').on('pending', async tx => {
    try {
      const transaction = await getProvider(
        usePublicApiForDetails ? 'public' : 'http'
      ).getTransaction(tx);

      if (!transaction) {
        bad++;
        if (logStats) {
          console.log('ð¥', 'good tx', good, 'null tx', bad);
        }
      } else {
        good++;
        if (logStats) {
          console.log('ð«', 'good tx', good, 'null tx', bad);
        }
      }

      if (areAddressesEqual('0x60c5435863e559d432e756d3f8b74466f7f4432b', transaction.from)) {
        console.log('ð¥my tx detected');
      }

      callback && callback(transaction);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  });
}

module.exports = listenPendingTx;
