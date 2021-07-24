const { USE_ZERG_ARMY } = require('../constants');
const { snipeCommand } = require('../zergArmy');
const snipe = require('./snipe');

let snipeInProgress = false;

async function handleSnipeSignal(snipeData) {
  if (snipeInProgress) {
    return;
  }

  snipeInProgress = true;

  if (USE_ZERG_ARMY) {
    await snipeCommand(snipeData);
    snipeInProgress = false;
    return;
  }

  await snipe(snipeData);
  snipeInProgress = false;
}

module.exports = handleSnipeSignal;
