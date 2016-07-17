import fs from 'fs';
import path from 'path';
import zipObject from 'lodash.zipobject';
const rules = fs.readdirSync(path.resolve(__dirname, 'rules')).map(f => f.replace(/\.js$/, ''));

module.exports = {
  // eslint-disable-next-line global-require
  rules: zipObject(rules, rules.map(rule => require(`./rules/${rule}`))),
  configs: {
    recommended: {
      rules: {
        'destructuring/no-rename': 'error',
        'destructuring/in-params': 'error',
      },
    },
  },
};
