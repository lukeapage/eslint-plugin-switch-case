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
const errors = [{ message: '' }];
ruleTester.run('no-rename', rule, {
  valid: [
    test({
      code: `
        switch(a) {
          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }]
    }),
    test({
      code: `
        switch(a) {
          case 2:

          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }]
    }),
    test({
      code: `
        switch(a) {
          case 2:break;

          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }]
    }),
    test({
      code: `
        switch(a) {
          case 2:break;

          // comment
          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }]
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          // comment

          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }]
    }),
    test({
      code: `
        switch(a) {
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }]
    }),
    test({
      code: `
        switch(a) {
          case 2:
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }]
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }]
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          // comment
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }]
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          // comment
          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }]
    }),
    test({
      code: `
        switch(a) {
          case 2:
          case 1:break;

          case 3:
        }
        `,
      options: ['always', { fallthrough: 'never' }]
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
      options: ['always', { fallthrough: 'never' }]
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
      errors,
    }),
    test({
      code: `
        switch(a) {
          case 2:break;
          case 1:break;
        }
        `,
      options: ['always', { fallthrough: 'always' }],
      errors,
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
      errors,
    }),
    test({
      code: `
        switch(a) {
          case 2:

          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
      errors,
    }),
    test({
      code: `
        switch(a) {
          case 2:break;

          case 1:break;
        }
        `,
      options: ['never', { fallthrough: 'never' }],
      errors,
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
      errors,
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
      errors,
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
      errors,
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
      errors,
    }),
  ],
});
