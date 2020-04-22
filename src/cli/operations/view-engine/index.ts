/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { dirname } from 'path'
import { execSync } from 'child_process'
import { envVariables } from './config'
import BeagleCliError, { BEAGLE_EXIT_CODE } from '../../errors'
import { Option } from '../../types'

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

  const cmd = `${envString}${runCli} ts-node -P ${pathToTsConfig} ${pathToIndex}`

  try {
    require('ts-node')
    require('amd-loader')
  } catch {
    throw new BeagleCliError(`Error! Please run "${runInstall} -D ts-node amd-loader" before running "${runCli} beagle view-engine".`)
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
