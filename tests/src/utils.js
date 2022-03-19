exports.test = function test(t) {
  return {
    ...t,
    parserOptions: {
      sourceType: "module",
      ecmaVersion: 2018,
    },
  };
};
