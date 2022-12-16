export const areEqualVectors = (a, b) => a.every((v, i) => v === b[i]);

export const infinityNorm = p => Math.max(...p.map(v => Math.abs(v))); // Ayyyy it's our good friend the L-infinity norm!

export const manhattanNorm = p => p.reduce((acc, v) => acc + Math.abs(v), 0);

export const subtractVectors = (a, b) => a.map((v, i) => v - b[i]);

export const addVectors = (a, b) => b.map((v, i) => v + a[i]);
