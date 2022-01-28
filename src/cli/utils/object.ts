/*
  * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *  http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
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

export function getEnvironmentPaths(object: any, path: string) {
  const keys = path.split('.')
  keys.forEach(key => object = object[key])
  return Object.keys(object)
}
