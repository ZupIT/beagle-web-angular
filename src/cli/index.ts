#!/usr/bin/env node

/*
  Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
  http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import cliOperations from './operations'
import { InvalidOperationError, InvalidOptionError, isBeagleCliError } from './errors'
import { Option } from './types'
import { logError } from './utils/styledLogger'

function isOptionValid(operation: keyof typeof cliOperations, optionName: string) {
  const validOptions = cliOperations[operation].options
  return validOptions && validOptions.some(({ name }) => name === optionName)
}

function processOptions(operation: keyof typeof cliOperations, rawOptions: string[]): Option[] {
  return rawOptions.map(rawOption => {
    const [name, value] = rawOption.split('=')
    if (!isOptionValid(operation, name)) throw new InvalidOptionError(rawOptions, operation, name)
    return { name: name.replace(/^--/, ''), value }
  })
}

async function start() {
  const operation = process.argv[2]
  const rawOptions = process.argv.slice(3)
  const isOperationValid = Object.keys(cliOperations).indexOf(operation) > -1
  if (!isOperationValid) throw new InvalidOperationError(rawOptions, operation)
  const options = processOptions(operation, rawOptions)
  await cliOperations[operation].run(options)
}

(async function () {
  try {
    await start()
    process.exit(0)
  } catch (error) {
    if (!isBeagleCliError(error)) throw error
    if (error.message) logError(error.message)
    process.exit(error.exitCode)
  }
}())
