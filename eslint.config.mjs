// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier/flat';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginPromise from 'eslint-plugin-promise';
import securityNodePlugin from 'eslint-plugin-security-node';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
      promise: pluginPromise.configs['flat/recommended'],
      'security-node': securityNodePlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...securityNodePlugin.configs.recommended.rules,
    },
  },
  prettier,
];
