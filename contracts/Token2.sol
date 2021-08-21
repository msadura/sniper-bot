pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token2 is ERC20 {
  constructor() ERC20('Mar 2', 'MAR2') {
    _mint(msg.sender, 10000000000000000000000);
  }
}
