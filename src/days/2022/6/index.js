import day from '../../../runner/day.js';

export default day(({ source }) => {
  const findPacketIndex = markerLength => {
    const cyclicBuffer = [];

    for (const [i, c] of source.split('').entries()) {
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

  return [() => findPacketIndex(4), () => findPacketIndex(14)];
});
