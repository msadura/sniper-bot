/* eslint-disable no-undef */
const Factory = artifacts.require('Factory.sol');
const Router = artifacts.require('Router.sol');
const Pair = artifacts.require('Pair.sol');
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');

module.exports = async done => {
  try {
    const [admin] = await web3.eth.getAccounts();
    const factory = await Factory.at('0x6725F303b657a9451d8BA641348b6761A6CC7a17');
    const router = await Router.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1');

    // Addresses of previously deployed tokens
    const token1 = await Token1.at('0x5148467d04E1926242CDBF99d2639265C8749896');
    const token2 = await Token2.at('0xF1af0143304c85fc7a0aA8f58f5684bb085f8923');
    const pairAddress = await factory.createPair.call(token1.address, token2.address);
    const tx = await factory.createPair(token1.address, token2.address);

    await token1.approve(router.address, 100000000000000000000); //100
    await token2.approve(router.address, 100000000000000000000);
    await router.addLiquidity(
      token1.address,
      token2.address,
      10000,
      10000,
      10000,
      10000,
      admin,
      Math.floor(Date.now() / 1000) + 60 * 10
    );
    const pair = await Pair.at(pairAddress);
    const balance = await pair.balanceOf(admin);
    console.log('🔥 pairAddress:', pairAddress);
    console.log(`balance LP: ${balance.toString()}`);
  } catch (e) {
    console.log(e);
  }
  done();
};
