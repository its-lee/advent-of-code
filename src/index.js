const day = process.argv[2];

const module = await import(`./days/day${day}/index.js`);

console.log(module.default);
