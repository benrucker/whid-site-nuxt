module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/first-attribute-linebreak': 'off',
    'vue/no-child-content': 'off',
    'vue/no-reserved-props': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/valid-attribute-name': 'off',
    'vue/valid-model-definition': 'off',
    'vue/multi-word-component-names': 'off',
    'no-use-before-define': 'off',
    // I don't want to turn this off, but it's proc'ing on type/value collisions :/
    'no-redeclare': 'off',
  },
};
