export const parseSourceParameter = source => {
  const sources = {
    i: 'input',
    d: 'demo'
  };

  if (!(source in sources)) {
    const valid = Object.keys(sources).join(', ');
    throw new Error(`A valid source parameter is required (one of ${valid}) - received ${source}`);
  }

  return sources[source];
};
