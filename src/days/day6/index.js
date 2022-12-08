import day from '../../helpers/day.js';

export default day(({ part, input }) => {
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

  part(findPacketIndex(4), 1042);
  part(findPacketIndex(14), 2980);
});
