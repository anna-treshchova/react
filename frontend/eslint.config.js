import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import conartiFsdPlugin from '@conarti/eslint-plugin-feature-sliced';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      'feature-sliced': conartiFsdPlugin}
    ,

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_',
      }],

      'feature-sliced/layers-slices': [
        'error',
        { 'alias': '@' }
      ],

      'feature-sliced/absolute-relative': [
        'error',
        { 'alias': '@' }
      ],
      'feature-sliced/public-api': [
        'error',
        { 'alias': '@' }
      ],
    },
  },
])
