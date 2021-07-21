require('dotenv').config();
const { runApiServer } = require('./apiServer');
const { USE_API_SERVER } = require('./constants');
// const swapExactETHForTokens = require('./functions/swapExactETHForTokens');

const listenPendingTx = require('./functions/listenPendingTx');
const parseTransaction = require('./functions/parseTransaction');
const { connectProvider } = require('./provider');
// const listenPairCreated = require('./functions/listenPairCreated');
// const pairCreatedSnipeCb = require('./utils/pairCreatedSnipeCb');
const { connectAccount } = require('./wallet');

async function run() {
  const onConnect = async () => {
    connectAccount();

    // Remove pairCreatedSnipeCb if you do not want real purchase
    // listenPairCreated(pairCreatedSnipeCb);
    listenPendingTx(parseTransaction);
  };

  await connectProvider(onConnect);

  if (USE_API_SERVER) {
    runApiServer();
  }
}

run();
