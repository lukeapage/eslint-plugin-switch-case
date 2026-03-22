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

const plugin = {
  meta: {
    name: "eslint-plugin-switch-case",
    version: "4.0.0",
    namespace: "switch-case",
  },
  rules: rules,
  configs: {},
};

plugin.configs.recommended = {
  plugins: {
    "switch-case": plugin,
  },
  rules: {
    "switch-case/newline-between-switch-case": "error",
    "switch-case/no-case-curly": "error",
  },
};

module.exports = plugin;
