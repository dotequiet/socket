module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './build/webpack.dev.js',
      },
    },
  },
  plugins: [
    'vue',
  ],
  rules: {
    "indent": [2, 2],
    "semi": 0,
    "prefer-spread": 0,
    "prefer-const": 0,
    "arrow-body-style": 0,
    "arrow-parens": 0,
    "no-unused-expressions": 0,
    "no-console": 0,
    "max-len": 0,
    "no-debugger": 0,
    "no-unused-vars": 0,
    "class-methods-use-this": 0,
    "max-classes-per-file": 0,
    "lines-between-class-members": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/no-mutable-exports": 0,
    "import/no-extraneous-dependencies": 0,
    "no-param-reassign": ["error", { "props": false }],
    "comma-dangle": ["error", "never"],
    "no-underscore-dangle": 0
  },
};
