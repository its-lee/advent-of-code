import input from './input.js';

const findPacketIndex = markerLength => {
  const cyclicBuffer = [];

  for (const [i, c] of input.split('').entries()) {
    if (new Set(cyclicBuffer).size === markerLength) {
      return i;
    }

    cyclicBuffer.push(c);
    if (cyclicBuffer.length > markerLength) {
      cyclicBuffer.shift();
    }
  }

  return undefined;
};

export default [findPacketIndex(4), findPacketIndex(14)];
