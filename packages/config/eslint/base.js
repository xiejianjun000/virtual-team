import nextPlugin from 'eslint-config-next/flat';

export default [
  ...nextPlugin,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    ignores: ['.next/', 'node_modules/'],
  },
];
