module.exports = {
  extends: '@mate-academy/eslint-config',
  env: {
    mocha: true,
  },
  globals: {
    expect: 'readonly',
  },
  rules: {
    'no-proto': 0,
    "object-curly-newline": "off",
    "no-console": "off",
    "max-len": "off"
  },
  plugins: ['jest']
};
