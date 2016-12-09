module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "allowImportExportEverywhere": false,
    "sourceType": "module",
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
    },
  },
  "plugins": [
    "prefer-bind-operator",
  ],
  "rules": {
    "comma-dangle": [
      "error",
      "always",
    ],
    "constructor-super": [
      "error",
    ],
    "eol-last": [
      "error",
    ],
    "indent": [
      "error",
      2,
    ],
    "key-spacing": [
      "error",
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    "no-console": [
      "warn",
    ],
    "no-const-assign": [
      "error",
    ],
    "no-debugger": [
      "warn",
    ],
    "no-irregular-whitespace": [
      "error",
    ],
    "no-trailing-spaces": [
      "error",
    ],
    "no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_", },
    ],
    "no-var": [
      "error",
    ],
    "object-shorthand": [
      "error",
    ],
    "prefer-rest-params": [
      "error",
    ],
    "prefer-spread": [
      "error",
    ],
    "quotes": [
      "error",
      "single",
    ],
    "semi": [
      "error",
      "always",
    ],
    "template-curly-spacing": [
      "error",
    ],
    "prefer-bind-operator/prefer-bind-operator": 2,
  },
  "globals": {
    "QUnit": false,
  },
};
