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

import { dirname } from 'path'
import { execSync } from 'child_process'
import BeagleCliError, { BEAGLE_EXIT_CODE } from '../../errors'
import { Option } from '../../types'
import { envVariables } from './config'

function runViewEngine(options: Option[]) {
  const pathToCli = dirname((require as any).main.filename)
  const pathToTsConfig = `${pathToCli}/operations/view-engine/tsconfig.view-engine.json`
  const pathToIndex = `${pathToCli}/operations/view-engine/process.js`
  const isNpm = options.some(({ name }) => name === 'npm')
  const runCli = isNpm ? 'npx' : 'yarn'
  const runInstall = isNpm ? 'npm install' : 'yarn add'

  const envString = options.reduce((result, { name, value }) => (
    envVariables[name] ? `${result}${envVariables[name]}=${value} ` : result
  ), '')

  const cmd = `${envString}${runCli} ts-node -P "${pathToTsConfig}" "${pathToIndex}"`

  try {
    require('ts-node')
    require('amd-loader')
  } catch {
    throw new BeagleCliError(`Error! Please run "${runInstall} -D ts-node amd-loader"
      before running " ${runCli} beagle view-engine".`)
  }

  try {
    const result = execSync(cmd, { encoding: 'utf8' })
    console.log(result)
  } catch (error) {
    if (error.status !== BEAGLE_EXIT_CODE) throw error
    console.log(error.stdout)
    throw new BeagleCliError()
  }
}

export default runViewEngine
