exports.test = function test(t) {
  return {
    ...t,
    languageOptions: {
      sourceType: "module",
      ecmaVersion: 2018,
    },
  };
};
