/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

const singleLineString = `^\\s*[^\\s]*'([^']|(\\\\'))*',?;?$`
const doubleQuoted = singleLineString.replace(/'/g, '"')
const template = singleLineString.replace(/'/g, '`')

const maxLengthIgnorePattern = `(${singleLineString})|(${doubleQuoted})|(${template})`

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json', './tsconfig.cli.json'] },
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'prettier/prettier': 'off',
    curly: ["error", "multi-line"],
    'max-len': ['error', { code: 100, ignorePattern: maxLengthIgnorePattern }],
    'arrow-body-style': ["error", "as-needed"],
    'eol-last': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'comma-spacing': ['error', { before: false, after: true }],
    'semi': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'keyword-spacing': ["error", { before: true, after: true }],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 'off',
    'import/order': ['warn', {
      groups: ['builtin', 'external','internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'ignore'
    }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: { delimiter: 'comma', requireLast: true },
      singleline: { delimiter: 'comma', requireLast: false }
    }],
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
