// .eslintrc.js
module.exports = {
  parser: '@babel/eslint-parser', // сучасний парсер для JS/JSX
  parserOptions: {
    requireConfigFile: false,     // не потребує окремого babel.config.js
    ecmaVersion: 2020,            // підтримка modern JS
    sourceType: 'module',         // для import/export
    ecmaFeatures: {
      jsx: true,                  // підтримка JSX
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect', // автоматичне визначення версії React
    },
  },
  rules: {
    // тут можеш додати свої правила, наприклад:
    'react/react-in-jsx-scope': 'off', // якщо React 17+
  },
};
