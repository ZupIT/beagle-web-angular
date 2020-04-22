/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { writeFileSync, unlinkSync } from 'fs'
import { ensureDirectoryExistence } from '../../utils/filesystem'
import { ViewEngineConfig } from '../view-engine/config'

export const DEFAULT_CONFIG_PATH = 'beagle.config.json'

export function createConfigurationFile(config: ViewEngineConfig) {
  const root = process.cwd()
  const fullPath = `${root}/${DEFAULT_CONFIG_PATH}`

  const json = JSON.stringify(config, null, 2)
  ensureDirectoryExistence(fullPath)
  writeFileSync(fullPath, `${json}\n`, { encoding: 'utf8' })
  return fullPath
}

export function removeConfigurationFile() {
  const root = process.cwd()
  const path = `${root}/${DEFAULT_CONFIG_PATH}`

  try {
    unlinkSync(path)
    return path
  } catch {}
}
