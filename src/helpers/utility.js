export const charCode = v => {
  const l = v.toLowerCase();
  return l === v ? l.charCodeAt(0) - 'a'.charCodeAt(0) + 1 : 26 + charCode(l);
};

export const range = (start, length) => [...Array(length).keys()].map(v => start + v);

export const transposeMatrix = m =>
  range(0, Math.max(m.length, m[0]?.length || 0)).map(c => m.map(r => r[c]));
