export const sumReducer = () => [(acc, v) => acc + v, 0];

export const chunkReducer = size => {
  let chunk = [];
  return [
    (acc, v) => {
      chunk.push(v);
      if (chunk.length === size) {
        acc.push(chunk);
        chunk = [];
      }
      return acc;
    },
    []
  ];
};
