import solution from '../../../runner/solution.js';

export default solution(({ source }) => {
  // eslint-disable-next-line no-unused-vars
  const compile = source => {
    const registers = ['w', 'x', 'y', 'z'];

    const initialState = {
      inputs: [],
      inputIndex: 0,
      ...registers.reduce((acc, r) => ({ ...acc, [r]: 0 }), {})
    };

    const machine = {
      state: { ...initialState },
      reset(inputs) {
        this.state = { ...initialState };
        this.state.inputs = inputs;
      },
      inp(a) {
        this.state[a] = this.state.inputs[this.state.inputIndex];
        ++this.state.inputIndex;
      },
      add(a, b) {
        this.state[a] += b;
      },
      mul(a, b) {
        this.state[a] *= b;
      },
      div(a, b) {
        if (!b) {
          throw new Error('Attempt to div by 0');
        }

        this.state[a] = Math.trunc(this.state[a] / b);
      },
      mod(a, b) {
        if (this.state[a] < 0 || b <= 0) {
          throw new Error('Attempt to perform illegal mod operation', this.state[a], b);
        }

        this.state[a] %= b;
      },
      eql(a, b) {
        this.state[a] = this.state[a] === this.state[b] ? 1 : 0;
      }
    };

    let totalInputs = 0;
    const commands = source.split('\n').map(line => {
      const [command, ...args] = line.split(' ');
      const resolvedArgs = args.map(a => (registers.includes(a) ? a : parseInt(a)));
      if (command === 'inp') {
        ++totalInputs;
      }

      return () => {
        resolvedArgs[1] =
          typeof resolvedArgs[1] === 'string' ? machine.state[resolvedArgs[1]] : resolvedArgs[1];
        console.log('running', line, machine.state, '->');
        console.log(resolvedArgs);
        machine[command](...resolvedArgs);
        // console.log(machine.state);
      };
    });

    return input => {
      input = input.toString().padStart(totalInputs, '0');
      machine.reset(input.split('').map(v => parseInt(v)));
      commands.forEach(command => command());
      return machine.state;
    };
  };

  // const program = compile(source);

  // console.log(program(9)); // should be w: 1 (8), x: 1 (4), y: 0 (2), z: 1

  // for (let i = 100000000000000 - 1; i > 0; --i) {
  //   // todo: check for 0s
  //   // todo: add try catch
  //   const output = program(i);
  //   if (output.z === 0) {
  //     console.log('success', i, output);
  //     return;
  //   } else {
  //     console.log('fail', i);
  //   }
  // }
});
