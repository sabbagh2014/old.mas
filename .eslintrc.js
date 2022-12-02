module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    plugins: ["unused-imports","react"],
    settings: {
      react: {
        "version": "detect"
      },
    },
    rules: {
      "react/prop-types": 0,
      "unused-imports/no-unused-imports": "error",
    },
  };
  