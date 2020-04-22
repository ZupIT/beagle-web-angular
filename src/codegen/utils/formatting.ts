/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

export function kebabToCamelCase(str: string) {
  return str.replace(/-\w/g, ([_, letter]) => letter.toUpperCase())
}

export function removeExtraIndentation(code:string, numberOfExtraSpaces: number) {
  return code
    .replace(new RegExp(`\\n\\s{${numberOfExtraSpaces}}`, 'g'), '\n')
    .replace(/^\n/, '')
    .replace(/\s*$/, '')
}
