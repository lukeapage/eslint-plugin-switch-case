import assert from 'assert';
import fs from 'fs';
import path from 'path';
import plugin from '../src/index';

const rules = fs.readdirSync(path.resolve(__dirname, '../src/rules/'))
    .map(f => path.basename(f, '.js'));

describe('all rule files should be exported by the plugin', () => {
  it('should export all rules', () => {
    rules.forEach(ruleName => {
      assert.equal(
        plugin.rules[ruleName],
        // eslint-disable-next-line global-require
        require(path.join('../src/rules', ruleName)),
        `rule ${ruleName} is not exported`);
    });
  });
});
