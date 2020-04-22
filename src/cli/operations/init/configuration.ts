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
