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

export const intersect = (...v) =>
  v.length <= 1 ? v[0] : intersect([...new Set(v[0].filter(x => v[1].includes(x)))], ...v.slice(2));

export const charCode = v => {
  const l = v.toLowerCase();
  return l === v ? l.charCodeAt(0) - 'a'.charCodeAt(0) + 1 : 26 + charCode(l);
};
