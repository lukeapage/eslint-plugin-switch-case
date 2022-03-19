const fs = require("fs");
const path = require("path");
const zipObject = require("lodash.zipobject");

const rules = fs
  .readdirSync(path.resolve(__dirname, "rules"))
  .map((f) => f.replace(/\.js$/, ""));

module.exports = {
  // eslint-disable-next-line global-require
  rules: zipObject(
    rules,
    rules.map((rule) => require(`./rules/${rule}`))
  ),
  configs: {
    recommended: {
      rules: {
        "switch-case/newline-between-switch-case": "error",
        "switch-case/no-case-curly": "error",
      },
    },
  },
};
