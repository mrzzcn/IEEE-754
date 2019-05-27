function float64ToOctets(number) {
  const buffer = new ArrayBuffer(8);
  new DataView(buffer).setFloat64(0, number, false);
  return [].slice.call(new Uint8Array(buffer));
}

function intToBinaryString(i, length = 8) {
  return Number(i)
    .toString(2)
    .padStart(length, '0');
}

function octetsToBinaryString(octets) {
  return octets
    .map(function(i) {
      return intToBinaryString(i);
    })
    .join('');
}

/**
 * Convert to IEEE 754
 * @param {Number} value
 */
export function toIEEE754(value) {
  const str = octetsToBinaryString(float64ToOctets(value));
  const bSign = str.slice(0, 1);
  const sign = (-1) ** parseInt(bSign, 2);

  const bExponent = str.slice(1, 12);
  const exponent = parseInt(bExponent, 2);
  const exponentNormalized = exponent - 1023;

  const bSignificand = str.slice(12);

  const bHidden = exponent === 0 ? 0 : 1;

  return {
    value,
    binaries: str.split(''),
    bSign,
    sign,
    bExponent,
    exponent,
    exponentNormalized,
    bHidden,
    bSignificand
  };
}
