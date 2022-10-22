module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'turbo',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'object-curly-spacing': ['error', 'always'],
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        tabs: false,
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        trailingComma: 'none',
        endOfLine: 'lf',
        bracketSpacing: true,
        bracketSameLine: true,
        arrowParens: 'always'
      }
    ],
    '@typescript-eslint/no-unused-vars': [
      'off',
      {
        ignoreRestSiblings: true
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
};
