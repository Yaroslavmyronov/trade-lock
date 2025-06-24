import { FlatCompat } from '@eslint/eslintrc';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Флет-конфігурація з `next`
const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    ignores: [
      '.next/**',
      '.cache/**',
      'package-lock.json',
      'public/**',
      'node_modules/**',
      'next-env.d.ts',
      'next.config.ts',
    ],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        globalThis: 'readonly',
      },
    },
    plugins: {
      prettier,
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      // JavaScript rules
      'prefer-const': 'warn',
      'no-var': 'warn',
      'no-unused-vars': 'warn',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],

      // TypeScript rules
      '@typescript-eslint/array-type': ['warn', { default: 'array' }],
      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'never',
        },
      ],

      // React rules
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-filename-extension': ['warn', { extensions: ['ts', 'tsx'] }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Prettier
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

export default eslintConfig;
