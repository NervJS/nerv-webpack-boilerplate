module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'ignores']
      }
    ],
    indentation: 2,
    'number-leading-zero': null,
    'media-feature-name-no-unknown': [
      true,
      {
        ignoreMediaFeatureNames: ['min--moz-device-pixel-ratio']
      }
    ],
    'unit-whitelist': ['px', '%', 'dppx', 's']
  }
}
