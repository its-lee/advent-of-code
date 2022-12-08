export default () => {
  return {
    submissions: [],
    add(actual, expected = undefined) {
      this.submissions.push({ actual, expected });
      return this;
    }
  };
};
