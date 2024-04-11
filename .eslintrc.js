module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    eqeqeq: ['error', 'always'],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-proto': 'error',
    semi: ['error', 'always'],
    curly: 'error',
  },
};
