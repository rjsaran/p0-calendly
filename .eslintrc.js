module.exports = {
  extends: 'airbnb-typescript-prettier',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    react: { version: 'detect' },
  },
  env: {
    node: true,
  },
  rules: {
    camelcase: 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-restricted-syntax': ['error', 'WithStatement'],
    radix: ['error', 'as-needed'],
  },
};
