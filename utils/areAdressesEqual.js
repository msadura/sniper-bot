function areAdressesEqual(addr1, addr2) {
  const tempAddr1 = addr1?.toLowerCase?.();
  const tempAddr2 = addr2?.toLowerCase?.();

  return tempAddr1 === tempAddr2;
}

module.exports = areAdressesEqual;
