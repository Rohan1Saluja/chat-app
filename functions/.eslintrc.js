module.exports = {
  parseOptions: {
    ecmaVersion: 2020,
  },
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
  },
};
