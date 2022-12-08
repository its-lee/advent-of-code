export const intersect = (...v) =>
  v.length <= 1 ? v[0] : intersect([...new Set(v[0].filter(x => v[1].includes(x)))], ...v.slice(2));

export const union = (...v) =>
  v.length <= 1 ? v[0] : union([...new Set(v[0].concat(v[1]))], ...v.slice(2));
