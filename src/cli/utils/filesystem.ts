/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
