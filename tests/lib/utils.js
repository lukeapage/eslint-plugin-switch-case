import defaults from 'lodash.defaults';

export function test(t) {
  return defaults(t, {
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 6,
    },
  });
}
