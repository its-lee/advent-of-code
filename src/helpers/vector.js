export const areEqualVectors = (a, b) => a.every((v, i) => v === b[i]);

export const infinityNorm = p => Math.max(...p.map(v => Math.abs(v))); // Ayyyy it's our good friend the L-infinity norm!

export const relative = (a, b) => b.map((v, i) => v - a[i]);
