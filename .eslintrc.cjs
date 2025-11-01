// .eslintrc.cjs
module.exports = {
  extends: ['standard'],
  env: {
    es2023: true,
    node: true,
    jest: true,
  },
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': 'off',
    'space-before-function-paren': ['error', 'never'],
  },
};
