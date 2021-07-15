require('dotenv').config();
// const swapExactETHForTokens = require('./functions/swapExactETHForTokens');

const listenPairCreated = require('./functions/listenPairCreated');
const { connectProvider } = require('./provider');
const { connectAccount } = require('./wallet');

async function run() {
  const onConnect = () => {
    connectAccount();
    listenPairCreated();
  };

  await connectProvider(onConnect);

  console.log('🔥', 'Do stuff after account connecting');

  // const resultTx = await swapExactETHForTokens({
  //   amountIn: '0.1',
  //   amountOut: '0.01',
  //   token: addresses.SUSHI,
  //   tokenName: '$SUSHI',
  //   gwei: '3',
  //   gasLimit: 161499
  // });
  // console.info('✅ bought', resultTx);
  // listenPairCreated();
}

run();
