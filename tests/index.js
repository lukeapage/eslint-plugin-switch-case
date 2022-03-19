const assert = require("assert");
const fs = require("fs");
const path = require("path");
const plugin = require("../src/index");

const rules = fs
  .readdirSync(path.resolve(__dirname, "../src/rules/"))
  .map((f) => path.basename(f, ".js"));

describe("all rule files should be exported by the plugin", () => {
  it("should export all rules", () => {
    rules.forEach((ruleName) => {
      assert.equal(
        plugin.rules[ruleName],
        // eslint-disable-next-line global-require
        require(path.join("../src/rules", ruleName)),
        `rule ${ruleName} is not exported`
      );
    });
  });
});
