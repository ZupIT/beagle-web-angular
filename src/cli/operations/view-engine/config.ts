/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
