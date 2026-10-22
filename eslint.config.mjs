import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintReact from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig({
  files: ['src/**/*.{ts,tsx}'],
  extends: [
    tseslint.configs.recommended, // Uses the recommended rules from typescript-eslint
    eslintReact.configs['recommended-type-checked'], // Uses the recommended rules from @eslint-react/eslint-plugin
    reactHooks.configs.flat.recommended, // Rules of hooks + React Compiler rules
    prettierConfig, // Disables ESLint rules that would conflict with prettier
  ],
  plugins: {
    prettier, // Displays prettier errors as ESLint errors
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      project: 'tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // Hooks and React Compiler rules are handled by eslint-plugin-react-hooks
    '@eslint-react/error-boundaries': 'off',
    '@eslint-react/exhaustive-deps': 'off',
    '@eslint-react/purity': 'off',
    '@eslint-react/rules-of-hooks': 'off',
    '@eslint-react/set-state-in-effect': 'off',
    '@eslint-react/set-state-in-render': 'off',
    '@eslint-react/static-components': 'off',
    '@eslint-react/unsupported-syntax': 'off',
    '@eslint-react/use-memo': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
  },
});
