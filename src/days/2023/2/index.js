import solution from '../../../runner/solution.js';

export default solution(({ source }) => {
  const colours = ['red', 'green', 'blue'];

  const parseGames = () => {
    return source.split('\n').map(s => {
      const [, gameString, drawsString] = /^Game (\d+): (.*)$/.exec(s);
      const game = Number.parseInt(gameString);
      const draws = drawsString.split(';').map(s => {
        return colours.reduce((acc, colour) => {
          const re = new RegExp(`(\\d+) ${colour}`);
          const [, count = 0] = re.exec(s) || [];
          return { ...acc, [colour]: Number.parseInt(count) };
        }, {});
      });

      return { game, draws };
    });
  };

  const test = { red: 12, green: 13, blue: 14 };

  const sumIdsOfValidGames = () => {
    return parseGames()
      .filter(g => {
        return g.draws.every(d => colours.every(colour => d[colour] <= test[colour]));
      })
      .reduce((acc, g) => acc + g.game, 0);
  };

  const sumPowerOfMinimumCubesOfGames = () => {
    return parseGames()
      .map(g =>
        colours.reduce((acc, c) => {
          return acc * Math.max(...g.draws.map(d => d[c]));
        }, 1)
      )
      .reduce((acc, power) => acc + power, 0);
  };

  return [() => sumIdsOfValidGames(), () => sumPowerOfMinimumCubesOfGames()];
});
