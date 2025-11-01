// .eslintrc.cjs
module.exports = {
  extends: ['standard'],
  env: { es2023: true, node: true, jest: true },
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': 'off',
    // erzwinge kein Leerzeichen
    'space-before-function-paren': ['error', 'never'],
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'space-before-function-paren': ['error', 'never'],
      },
    },
  ],
};
