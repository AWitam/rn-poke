// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier', 'eslint:recommended', "plugin:react-hooks/recommended"],
  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  
  },
  env: {
    'jest/globals': true,
  },
};
