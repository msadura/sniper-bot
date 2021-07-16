require('dotenv').config();
const { runApiServer } = require('./apiServer');
const { USE_API_SERVER } = require('./constants');
// const swapExactETHForTokens = require('./functions/swapExactETHForTokens');

const listenPairCreated = require('./functions/listenPairCreated');
const { connectProvider } = require('./provider');
const pairCreatedSnipeCb = require('./utils/pairCreatedSnipeCb');
const { connectAccount } = require('./wallet');

async function run() {
  const onConnect = async () => {
    connectAccount();

    // Remove pairCreatedSnipeCb if you do not want real purchase
    listenPairCreated(pairCreatedSnipeCb);
  };

  await connectProvider(onConnect);

  if (USE_API_SERVER) {
    runApiServer();
  }
}

run();
