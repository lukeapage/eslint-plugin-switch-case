const fs = require("node:fs");
const path = require("node:path");
const plugin = require("../src/index");

const rules = fs
  .readdirSync(path.resolve(__dirname, "../src/rules/"))
  .map((f) => path.basename(f, ".js"));

describe("all rule files should be exported by the plugin", () => {
  it("should export all rules", () => {
    rules.forEach((ruleName) => {
      expect(plugin.rules[ruleName]).toEqual(
        require(path.join("../src/rules", ruleName)),
        `rule ${ruleName} is not exported`,
      );
    });
  });
});
