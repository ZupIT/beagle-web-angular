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

import { defaultViewEngineConfig } from '../view-engine/config'
import { InitApplicationData } from '../../types'
import { addToGitIgnore } from '../../utils/git'
import {
  createPackageScripts,
  addDependencies,
  removeDependencies,
  install,
} from '../../utils/packages'
import { logSuccess, logWarning, logInfo, log } from '../../utils/styledLogger'
import { getBeagleModuleCopyPath } from '../view-engine/config'
import { createAngularJsonEntries } from './angular'
import { createConfigurationFile, removeConfigurationFile } from './configuration'

const dependencies = {
  'ts-node': 'latest',
  'amd-loader': 'latest',
}

const dependencyNames = Object.keys(dependencies)

export function undoViewEngineConfiguration(isNpm: boolean) {
  const path = removeConfigurationFile()
  if (path) logInfo(`Configuration file at "${path}" was successfully removed.`)
  try {
    removeDependencies(dependencyNames, true)
    logInfo(`The following dependencies were successfully removed from your package.json: ${dependencyNames.join(', ')}.`)
  } catch {
    logWarning(`Unable to remove the following dependencies from your package.json: ${dependencyNames.join(', ')}.`)
  }
}

function setupConfig(beagleModulePath: string, outputPath: string) {
  if (beagleModulePath === defaultViewEngineConfig.beagleModulePath) return
  const path = createConfigurationFile({ beagleModulePath, outputPath })
  logInfo(`Configuration file created at "${path}"`)
}

function setupDependencies(isNpm: boolean) {
  addDependencies(dependencies, true)
  logInfo(`The following dependencies were successfully added to your package.json: ${dependencyNames.join(', ')}`)
  try {
    console.log('installing dependencies...')
    install(isNpm)
  } catch {
    const cmd = isNpm ? 'npm install' : 'yarn'
    logWarning(`Could not install the dependencies. Please, run "${cmd}" before running you project.`)
  }
}

function setupGitIgnore(paths: string[]) {
  try {
    const hasFileChanged = addToGitIgnore(paths, 'Beagle')
    if (hasFileChanged) logInfo(`The following paths were successfully added to your .gitignore: ${paths.join(', ')}`)
  } catch {
    logWarning(`Could not add to your .gitignore: ${paths.join(', ')}. Do you have a .gitignore file?`)
  }
}

function setupPackageScripts(isNpm: boolean) {
  const runCmd = isNpm ? 'npx' : 'yarn'
  const npm = isNpm ? ' --npm' : ''
  createPackageScripts([
    {
      name: 'build',
      run: `${runCmd} beagle view-engine${npm} && ng build --prod`,
    },
    {
      name: 'serve',
      run: `${runCmd} beagle view-engine${npm} && ng serve`,
    },
  ])
  logInfo('scripts "build" and "serve" were successfully created in your package.json.')
}

function setupAngularJson(beagleModulePath: string, outputPath: string) {
  const hasFileChanged = createAngularJsonEntries(beagleModulePath, outputPath)
  if (hasFileChanged) {
    logInfo('Replace entry for beagle module was successfully created in the angular.json file.')
  }
}

function logViewEngineInfo(isNpm: boolean) {
  const runScript = isNpm ? 'npm run' : 'yarn'
  const runCli = isNpm ? 'npx' : 'yarn'
  console.log('\nBeagle detected you\'re using ViewEngine.')
  log(
    'From now on, please never execute "ng build" or "ng serve" directly. For Beagle to work properly, you should always use ',
    { text: ` ${runScript} build `, background: 'yellow', color: 'gray' },
    ' and ',
    { text: ` ${runScript} serve `, background: 'yellow', color: 'gray' },
    ' instead.',
  )
  logSuccess(`If you upgrade Angular to use Ivy, don\'t forget to run "${runCli} beagle init" again.`)
}


function handleViewEngine({ beagleModulePath, outputPath, isNpm }: InitApplicationData) {
  setupConfig(beagleModulePath, outputPath)
  setupDependencies(isNpm)
  setupGitIgnore([outputPath, getBeagleModuleCopyPath(beagleModulePath)])
  setupPackageScripts(isNpm)
  setupAngularJson(beagleModulePath, outputPath)
  logViewEngineInfo(isNpm)  
}

export default handleViewEngine
