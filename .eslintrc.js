module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2],
    semi: [2, 'always'],
    'react/prop-types': 'off',
    'eol-last': ['error', 'always'],
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }],
    quotes: ['error', 'single']
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
