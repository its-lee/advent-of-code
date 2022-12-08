export default () => {
  return {
    items: [],
    add(actual, expected = undefined) {
      this.items.push({ actual, expected });
      return this;
    }
  };
};
