// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../src/rules/no-default-case");
const { test } = require("../utils");

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();

const defaultNotAllowedError = {
  message: "Default case is not allowed.",
};

const defaultWithContentNotAllowedError = {
  message: "Default case with content is not allowed.",
};

ruleTester.run("no-default-case", rule, {
  valid: [
    // Switch without default case
    test({
      code: "switch (value) { case 'a': doA(); break; case 'b': doB(); break; }",
    }),

    // Switch with only one case, no default
    test({
      code: "switch (status) { case 'active': doSomething(); break; }",
    }),

    // Empty switch
    test({
      code: "switch (value) { }",
    }),

    // Switch with fallthrough cases, no default
    test({
      code: "switch (value) { case 'a': case 'b': doAB(); break; case 'c': doC(); break; }",
    }),

    // With allowEmpty: true, empty default should be allowed
    test({
      code: "switch (value) { case 'a': doA(); break; case 'b': doB(); break; default: }",
      options: [{ allowEmpty: true }],
    }),

    // With allowEmpty: true, default with only comments
    test({
      code: "switch (value) { case 'a': doA(); break; default: /* empty */ }",
      options: [{ allowEmpty: true }],
    }),
  ],

  invalid: [
    // Basic default case should be rejected
    test({
      code: "switch (value) { case 'a': doA(); break; case 'b': doB(); break; default: doDefault(); }",
      errors: [defaultNotAllowedError],
    }),

    // Default case at the beginning
    test({
      code: "switch (value) { default: doDefault(); case 'a': doA(); break; }",
      errors: [defaultNotAllowedError],
    }),

    // Default case in the middle
    test({
      code: "switch (value) { case 'a': doA(); break; default: doDefault(); case 'b': doB(); break; }",
      errors: [defaultNotAllowedError],
    }),

    // Empty default case should be rejected by default
    test({
      code: "switch (value) { case 'a': doA(); break; default: }",
      errors: [defaultNotAllowedError],
    }),

    // Default with only break statement
    test({
      code: "switch (value) { case 'a': doA(); break; default: break; }",
      errors: [defaultNotAllowedError],
    }),

    // With allowEmpty: true, default with content should still be rejected
    test({
      code: "switch (value) { case 'a': doA(); break; case 'b': doB(); break; default: doDefault(); }",
      options: [{ allowEmpty: true }],
      errors: [defaultWithContentNotAllowedError],
    }),

    // With allowEmpty: true, default with break should be rejected
    test({
      code: "switch (value) { case 'a': doA(); break; default: break; }",
      options: [{ allowEmpty: true }],
      errors: [defaultWithContentNotAllowedError],
    }),

    // With allowEmpty: true, default with throw should be rejected
    test({
      code: "switch (value) { case 'a': doA(); break; default: throw new Error('Unexpected'); }",
      options: [{ allowEmpty: true }],
      errors: [defaultWithContentNotAllowedError],
    }),

    // Multiple switch statements, both with default
    test({
      code: "switch (value1) { case 'a': doA(); break; default: doDefault1(); } switch (value2) { case 'b': doB(); break; default: doDefault2(); }",
      errors: [defaultNotAllowedError, defaultNotAllowedError],
    }),

    // Nested switch with default
    test({
      code: "switch (outer) { case 'x': switch (inner) { case 'y': doY(); break; default: doDefault(); } break; }",
      errors: [defaultNotAllowedError],
    }),
  ],
});