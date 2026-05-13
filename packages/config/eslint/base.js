import nextPlugin from 'eslint-config-next';

export default [
  ...nextPlugin,
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    ignores: ['.next/', 'node_modules/', 'dist/', 'coverage/', '*.js'],
  },
];
