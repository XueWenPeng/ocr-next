module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['build', 'feat', 'fix', 'test', 'style', 'docs']],
  },
};
