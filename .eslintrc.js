module.exports = {
  env: {
    node: true,
    jest: true,
  },
  plugins: ['unused-imports'],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'no-console': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@next/next/no-img-element': 'off',
    'jsx-a11y/alt-text': 'off',
    'react/jsx-key': 'off',
  },
};
