/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

function ensurePathArrayExistence(object: any, pathArray: string[], defaultValue: any) {
  const current = pathArray.shift()
  if (!current) return
  if (pathArray.length) {
    object[current] = object[current] || {}
    return ensurePathArrayExistence(object[current], pathArray, defaultValue)
  }
  object[current] = object[current] || defaultValue
}

export function ensurePathExistence(object: any, path: string, defaultValue: any) {
  ensurePathArrayExistence(object, path.split('.'), defaultValue)
}
