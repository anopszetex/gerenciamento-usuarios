import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import securityNode from 'eslint-plugin-security-node';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      'security-node': securityNode,
    },
    // extends: ['standard-with-typescript', 'prettier'],
    rules: {
      ...securityNode.configs.recommended.rules,
    },
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
]);
