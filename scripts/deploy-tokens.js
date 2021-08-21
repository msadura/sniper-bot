/* eslint-disable no-undef */
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');

module.exports = async done => {
  try {
    const token1 = await Token1.new();
    const token2 = await Token2.new();

    console.log('🔥', 'Deployed toknes:');
    console.log('🔥 token 1', token1.address);
    console.log('🔥 token 2', token2.address);
  } catch (e) {
    console.log(e);
  }
  done();
};
