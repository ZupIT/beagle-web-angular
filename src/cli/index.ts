#!/usr/bin/env node

/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
