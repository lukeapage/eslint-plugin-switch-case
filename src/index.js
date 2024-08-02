const fs = require("fs");
const path = require("path");

const rules = fs
  .readdirSync(path.resolve(__dirname, "rules"))
  .map((f) => f.replace(/\.js$/, ""))
  .reduce((rules, ruleName) => {
    return {
      ...rules,
      [ruleName]: require(`./rules/${ruleName}`),
    };
  }, {});

module.exports = {
  rules: rules,
  configs: {
    recommended: {
      rules: {
        "switch-case/newline-between-switch-case": "error",
        "switch-case/no-case-curly": "error",
      },
    },
  },
};
