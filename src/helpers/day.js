const readData = async (day, input) => {
  return (await import(`../days/day${day}/${input ? 'input' : 'demo'}.js`)).default;
};

export default dayCallback => {
  return async day => {
    const parts = [];

    dayCallback({
      part(actual, expected = undefined) {
        parts.push({ actual, expected });
      },
      input: await readData(day, true),
      demo: await readData(day, false)
    });

    return { parts };
  };
};
