/*
  * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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

import { relative, dirname, basename } from 'path'
import { existsSync, mkdirSync } from 'fs'

function getDirPathPrefix(dir: string) {
  if (!dir) return '.'
  if (dir.startsWith('.')) return ''
  return './'
}

export function getImportFilePath(from: string, to: string) {
  const fromDir = dirname(from)
  const toDir = dirname(to)
  const toFile = basename(to, '.ts')
  const relativeDir = relative(fromDir, toDir)
  const prefix = getDirPathPrefix(relativeDir)

  return `${prefix}${relativeDir}/${toFile}`
}

export function ensureDirectoryExistence(filePath: string) {
  const directory = dirname(filePath)
  if (existsSync(directory)) return true
  ensureDirectoryExistence(directory)
  mkdirSync(directory)
}
