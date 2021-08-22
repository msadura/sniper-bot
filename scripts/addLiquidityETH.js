/* eslint-disable no-undef */
const Router = artifacts.require('Router.sol');
const Token1 = artifacts.require('Token1.sol');
const ethers = require('ethers');

module.exports = async done => {
  try {
    const [admin] = await web3.eth.getAccounts();
    const router = await Router.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1');

    // Addresses of previously deployed token
    const token1 = await Token1.at('0x5148467d04E1926242CDBF99d2639265C8749896');
    // Chain native token address
    // const weth = await Token2.at('0xF1af0143304c85fc7a0aA8f58f5684bb085f8923');

    const tokenQuantity = ethers.utils.parseEther('100');
    const ethQuantity = ethers.utils.parseEther('0.11');

    await token1.approve(router.address, tokenQuantity); //100
    await token2.approve(router.address, tokenQuantity);
    await router.addLiquidityETH(
      token1.address,
      tokenQuantity,
      tokenQuantity,
      ethQuantity,
      tokenQuantity,
      admin,
      Math.floor(Date.now() / 1000) + 60 * 10,
      {
        value: ethQuantity
      }
    );

    console.log('🔥', 'Liquidity eth added');
  } catch (e) {
    console.log(e);
  }
  done();
};
