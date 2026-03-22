// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../src/rules/no-case-curly");
const { test } = require("../utils");

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [
  {
    message:
      "Do not use braces in a case - extract the case to a" +
      " function if it requires its own variables.",
  },
];
ruleTester.run("no-case-curly", rule, {
  valid: [
    test({ code: "switch(a) { case 1: break; }" }),
    test({ code: "switch(a) { case 1: case 2: }" }),
    test({ code: "switch(a) { case 1: }" }),
  ],
  invalid: [
    test({
      code: "switch(a) { case 1: { break; } }",
      errors,
    }),
    test({
      code: "switch(a) { case 1: default: { break; } break; }",
      errors,
    }),
  ],
});
