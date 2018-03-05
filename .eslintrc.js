module.exports = {
  extends: [
    'eslint-config-standard',
    'eslint-config-standard-jsx',
    'eslint-config-prettier'
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      "pragma": "Nerv"
    }
  },
  parser: 'babel-eslint',
  rules: {
    "no-console": "error",
    "no-param-reassign" : 1,
    "prefer-const": "error",
    "no-var": "error"
  }
}