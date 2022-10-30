// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('./base.cjs');

module.exports = {
  ...base,
  extends: ['plugin:react/recommended', ...base.extends],
  plugins: ['react', 'react-hooks', ...base.plugins],
  rules: {
    ...base.rules,
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  },
  parserOptions: {
    ...base.parserOptions,
    ecmaFeatures: {
      jsx: true
    }
  }
};
