const js = require("@eslint/js");
const globals = require("globals");
const nodeRecommended = require("eslint-plugin-n/configs/recommended-script");
const eslintPlugin = require("eslint-plugin-eslint-plugin");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  {
    languageOptions: { globals: globals.jest },
    linterOptions: { reportUnusedDisableDirectives: true },
  },
  js.configs.recommended,
  nodeRecommended,
  eslintPlugin.default.configs.recommended,
  prettierConfig,
];
