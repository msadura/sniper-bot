const express = require('express');
const addresses = require('./addresses');
const { SNIPE_TOKEN_NAMES } = require('./constants');
const { snipe } = require('./utils/snipe');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.baseUrl);
  res.send('Sniper bot server api is up');
});

router.get('/snipe', async (req, res) => {
  try {
    const tokenName = req.query?.tokenName
      ? req.query.tokenName.toUpperCase()
      : SNIPE_TOKEN_NAMES[0];
    const tokenAddress = addresses[tokenName];
    const resultTx = await snipe(tokenAddress);
    res.send(resultTx);
    res.end();
  } catch (e) {
    res.send(e);
    res.end();
  }
});

app.use('/', router);

function runApiServer() {
  app.listen(3002);
  console.log('🔥', 'Api server listens on port 3002');
}

module.exports = { runApiServer };
