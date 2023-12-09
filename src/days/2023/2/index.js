import solution from '../../../runner/solution.js';

export default solution(({ source }) => {
  const parseGames = () => {
    return source.split('\n').map(s => {
      const [, gameString, drawsString] = /^Game (\d+): (.*)$/.exec(s);
      const game = Number.parseInt(gameString);
      const draws = drawsString.split(';').map(s => {
        return ['red', 'green', 'blue'].reduce((acc, colour) => {
          const re = new RegExp(`(\\d+) ${colour}`);
          const [, count = 0] = re.exec(s) || [];
          return { ...acc, [colour]: Number.parseInt(count) };
        }, {});
      });

      return { game, draws };
    });
  };

  const sumIdsOfValidGames = () => {
    const games = parseGames();
    console.log(games);
  };

  return [() => sumIdsOfValidGames()];
});
