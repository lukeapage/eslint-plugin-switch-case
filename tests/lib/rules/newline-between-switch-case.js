// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import rule from '../../../src/rules/newline-between-switch-case';
import { RuleTester } from 'eslint';
import { test } from '../utils';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errorsExtraneous = [{ message: 'Extraneous newlines between switch cases.' }];
const errorsMissing = [{ message: 'Newline required between switch cases.' }];
ruleTester.run('newline-between-switch-case', rule, {
  valid: [
    test({
      code: `
        switch(a) {
          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }],
    }),
    test({
      code: `
        switch(a) {
          case 2:

          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }],
    }),
    test({
      code: `
        switch(a) {
          case 2:break;

          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }],
    }),
    test({
      code: `
        switch(a) {
          case 2:break;

          // comment
          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }],
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          // comment

          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }],
    }),
    test({
      code: `
        switch(a) {
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
    }),
    test({
      code: `
        switch(a) {
          case 2:
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          // comment
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
    }),
    test({
      code: `
        switch(a) {
          case 2:
          case 1:break;

          case 3:
        }
        `,
      options: ['always', { fallthrough: 'never' }],
    }),
    test({
      code: `
        switch(a) {
          case 2:
            f();
          case 1:break;

          case 3:
        }
        `,
      options: ['always', { fallthrough: 'never' }],
    }),
    test({
      code: `
        switch(a) {
          case 2: {
            f();
          }
          case 1:break;

          case 3:
        }
        `,
      options: ['always', { fallthrough: 'never' }],
    }),
    test({
      code: `
        switch(a) {
          case 2: {
            f();
            break;
          }

          case 1:break;

          case 3:
        }
        `,
      options: ['always', { fallthrough: 'never' }],
    }),
    test({
      code: `var f = () => {
        switch(a) {
          case 2: {
            const b = true;
            if (a) {
              return a;
            } else {
              return b;
            }
          }

          case 1:break;

          case 3:
        }};
        `,
      options: ['always', { fallthrough: 'never' }],
    }),
  ],
  invalid: [
    test({
      code: `
        switch(a) {
          case 2:
          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }],
      errors: errorsMissing,
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }],
      errors: errorsMissing,
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          // comment
          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }],
      errors: errorsMissing,
    }),
    test({
      code: `
        switch(a) {
          case 2:

          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
      errors: errorsExtraneous,
    }),
    test({
      code: `
        switch(a) {
          case 2:break;

          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
      errors: errorsExtraneous,
    }),
    test({
      code: `
        switch(a) {
          case 2:break;

          // comment
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
      errors: errorsExtraneous,
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          // comment

          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
      errors: errorsExtraneous,
    }),
    test({
      code: `
        switch(a) {
          case 2:
          case 1:break;
          case 3:
        }
        `,
      options: ['always', { fallthrough: 'never' }],
      errors: errorsMissing,
    }),
    test({
      code: `
        switch(a) {
          case 2:
            f();

          case 1:break;

          case 3:
        }
        `,
      options: ['always', { fallthrough: 'never' }],
      errors: errorsExtraneous,
    }),
    test({
      code: `
        switch(a) {
          case 2: {
            f();
          }

          case 1:break;

          case 3:
        }
        `,
      options: ['always', { fallthrough: 'never' }],
      errors: errorsExtraneous,
    }),
  ],
});
