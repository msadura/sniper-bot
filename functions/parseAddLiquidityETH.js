const ethers = require('ethers');

const abi = [
  'function addLiquidityETH(address token, uint amountTokenDesired, uint amountTokenMin, uint amountETHMin, address to, uint deadline) external payable returns (uint amountToken, uint amountETH, uint liquidity)'
];
const iface = new ethers.utils.Interface(abi);

function parseAddLiquidityETH(tx) {
  let data = null;

  try {
    const txData = iface.parseTransaction(tx);
    // console.log('🔥', txData);
    data = txData;
    // prepare data object
    // '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    // BigNumber { _hex: '0x0fb45b44', _isBigNumber: true },
    // BigNumber { _hex: '0x0f943193', _isBigNumber: true },
    // BigNumber { _hex: '0x0f2c3029286dfe7512', _isBigNumber: true },
    // '0xCD854305ff2E6A5eA89f03f89728C8672e1ea380',
    // BigNumber { _hex: '0x60f86904', _isBigNumber: true },
    // token: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    // amountTokenDesired: BigNumber { _hex: '0x0fb45b44', _isBigNumber: true },
    // amountTokenMin: BigNumber { _hex: '0x0f943193', _isBigNumber: true },
    // amountETHMin: BigNumber { _hex: '0x0f2c3029286dfe7512', _isBigNumber: true },
    // to: '0xCD854305ff2E6A5eA89f03f89728C8672e1ea380',
    // deadline: BigNumber { _hex: '0x60f86904', _isBigNumber: true }
  } catch (e) {
    // this is not addLiquidity function
  }

  return data;
}

module.exports = parseAddLiquidityETH;
