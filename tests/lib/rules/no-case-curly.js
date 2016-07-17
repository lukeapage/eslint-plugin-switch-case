// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import rule from '../../../src/rules/no-case-curly';
import { RuleTester } from 'eslint';
import { test } from '../utils';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [{ message: 'Do not use braces in a case - extract the case to a' +
  ' function if it requires its own variables.' }];
ruleTester.run('no-rename', rule, {
  valid: [
    test({ code: 'switch(a) { case 1: break; }' }),
    test({ code: 'switch(a) { case 1: case 2: }' }),
    test({ code: 'switch(a) { case 1: }' }),
  ],
  invalid: [
    test({
      code: 'switch(a) { case 1: { break; } }',
      errors,
    }),
    test({
      code: 'switch(a) { case 1: default: { break; } break; }',
      errors,
    }),
  ],
});
