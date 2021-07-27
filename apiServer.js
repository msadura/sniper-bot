const express = require('express');
const addresses = require('./addresses');
const handleSnipeSignal = require('./utils/handleSnipeSignal');
const { getFundsBack, callToArms, logBalances } = require('./zergArmy');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.baseUrl);
  res.send('Sniper bot server api is up');
});

router.get('/snipe', async (req, res) => {
  try {
    const tokenSymbol = req.query.tokenSymbol.toUpperCase();
    const tokenAddress = addresses[tokenSymbol];

    if (!tokenSymbol || !tokenAddress) {
      throw 'Provide correct snipe token symbol in tokenSymbol query param!';
    }

    await handleSnipeSignal({ token: tokenAddress, tokenSymbol });
    res.send('Snipe finished. Check console for results');
    res.end();
  } catch (e) {
    res.send(e);
    res.end();
  }
});

router.get('/refund', async (req, res) => {
  try {
    await getFundsBack();
    res.send('Funds from minions returned to main account');
    res.end();
  } catch (e) {
    res.send(e);
    res.end();
  }
});

router.get('/balance', async (req, res) => {
  try {
    await logBalances();
    res.send('Done.');
    res.end();
  } catch (e) {
    res.send(e);
    res.end();
  }
});

router.get('/cta', async (req, res) => {
  try {
    await callToArms();
    res.send('Minions armed with snipe funds.');
    res.end();
  } catch (e) {
    res.send(e);
    res.end();
  }
});

app.use('/', router);

function runApiServer() {
  app.listen(process.env.PROD ? 8081 : 3002);
  console.log('🔥', 'Api server listens on port 3002');
}

module.exports = { runApiServer };
