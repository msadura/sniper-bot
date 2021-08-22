/* eslint-disable no-undef */
const Router = artifacts.require('Router.sol');
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');
const ethers = require('ethers');

module.exports = async done => {
  try {
    const [admin] = await web3.eth.getAccounts();
    const router = await Router.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1');

    // Addresses of previously deployed tokens
    const token1 = await Token1.at('0x5148467d04E1926242CDBF99d2639265C8749896');
    const token2 = await Token2.at('0xF1af0143304c85fc7a0aA8f58f5684bb085f8923');
    const tokenQuantity = ethers.utils.parseEther('100');

    await token1.approve(router.address, tokenQuantity); //100
    await token2.approve(router.address, tokenQuantity);
    await router.addLiquidity(
      token1.address,
      token2.address,
      tokenQuantity,
      tokenQuantity,
      tokenQuantity,
      tokenQuantity,
      admin,
      Math.floor(Date.now() / 1000) + 60 * 10
    );

    console.log('🔥', 'Liquidity added');
  } catch (e) {
    console.log(e);
  }
  done();
};
