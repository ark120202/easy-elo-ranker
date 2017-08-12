module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:promise/recommended',
    'plugin:vue/recommended',
    'plugin:unicorn/recommended',
  ],
  plugins: [
    'promise',
    'unicorn',
  ],
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js'],
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'no-console': 0,
    'default-case': 0,
    'no-param-reassign': 0,
    'global-require': 0,
    'linebreak-style': 0,

    // eslint-plugin-promise
    'promise/prefer-await-to-then': 2,

    // eslint-plugin-vue
    'vue/html-end-tags': 2,
    'vue/html-no-self-closing': 2,
    'vue/html-quotes': 2,
    'vue/name-property-casing': 1,
    'vue/no-async-in-computed-properties': 2,
    'vue/no-duplicate-attributes': 2,
    'vue/no-side-effects-in-computed-properties': 2,
    'vue/no-template-key': 2,
    'vue/order-in-components': 2,
    'vue/return-in-computed-property': 2,
    'vue/v-bind-style': 2,
    'vue/v-on-style': 2,

    // eslint-plugin-unicorn
    'unicorn/filename-case': 0,
    'unicorn/explicit-length-check': [0, {
      'non-zero': 'greater-than',
    }],
  },
};
