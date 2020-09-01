module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/recommended', 'airbnb-base'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vuetify', 'vue', '@typescript-eslint/eslint-plugin'],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
  },
};
