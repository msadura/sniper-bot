require('dotenv').config();
const { runApiServer } = require('./apiServer');
const { USE_API_SERVER } = require('./constants');
// const swapExactETHForTokens = require('./functions/swapExactETHForTokens');

// const listenPairCreated = require('./functions/listenPairCreated');
// const pairCreatedSnipeCb = require('./utils/pairCreatedSnipeCb');
const connectSniper = require('./utils/connectSniper');

async function run() {
  await connectSniper();

  if (USE_API_SERVER) {
    runApiServer();
  }
}

run();
