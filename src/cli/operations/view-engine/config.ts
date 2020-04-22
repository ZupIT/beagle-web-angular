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

import { basename, dirname } from 'path'

export interface ViewEngineConfig {
  beagleModulePath?: string,
  outputPath?: string,
}

export const envVariables = {
  config: 'VIEW_ENGINE_CONFIG',
  input: 'BEAGLE_MODULE_PATH',
  output: 'OUTPUT_PATH',
}

function getEnv(name: keyof typeof envVariables) {
  return process.env[envVariables[name]]
}

export const defaultViewEngineConfig: Required<ViewEngineConfig> = {
  beagleModulePath: 'src/app/beagle.module.ts',
  outputPath: 'src/app/.beagle.module.generated.ts',
}

const ViewEngineConfigPath = getEnv('config') || 'beagle.config.json'

function fixConfigurationPath(root: string, path?: string) {
  return path && `${root}/${path.replace(/^\.\//, '')}`
}

function fixConfigurationPaths(config: ViewEngineConfig): ViewEngineConfig {
  const root = process.cwd()
  return {
    ...config,
    beagleModulePath: fixConfigurationPath(root, config.beagleModulePath),
    outputPath: fixConfigurationPath(root, config.outputPath),
  }
}

function getConfigFromFile() {
  const root = process.cwd()
  try {
    return require(`${root}/${ViewEngineConfigPath}`)
  } catch {
    return {}
  }
}

function getConfigFromEnvVariables() {
  let envConfig: ViewEngineConfig = {}
  if (getEnv('input')) envConfig.beagleModulePath = getEnv('input')
  if (getEnv('output')) envConfig.outputPath = getEnv('output')
  return envConfig
}

export function getBeagleModuleCopyPath(originalModulePath: string) {
  const dir = dirname(originalModulePath)
  const filename = basename(originalModulePath).replace(/(.*)\.ts$/, '.$1.original.ts')
  return `${dir}/${filename}`
}

export function getViewEngineConfig(): Required<ViewEngineConfig> {
  return fixConfigurationPaths({
    ...defaultViewEngineConfig,
    ...getConfigFromFile(),
    ...getConfigFromEnvVariables(),
  }) as Required<ViewEngineConfig>
}
