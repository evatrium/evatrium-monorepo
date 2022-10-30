// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('./base.cjs');

module.exports = {
  ...base,
  extends: [...base.extends, 'plugin:react/recommended'],
  plugins: [...base.plugins, 'react', 'react-hooks'],
  rules: {
    ...base.rules,
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
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
