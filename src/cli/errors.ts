/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import BeagleError from '../errors'

export const BEAGLE_EXIT_CODE = 3

export default class BeagleCliError extends BeagleError {
  exitCode = BEAGLE_EXIT_CODE
}

class ErrorWithHelp extends BeagleCliError {
  constructor(rawOptions: string[], message: string) {
    const cmd = rawOptions.indexOf('--npm') === -1 ? 'yarn beagle help' : 'npx beagle help'
    super(`${message}. Please run "${cmd}" for more information.`)
  }
}

export class InvalidOperationError extends ErrorWithHelp {
  constructor(rawOptions: string[], operation: string) {
    super(rawOptions, `Invalid operation "${operation}"`)
  }
}

export class InvalidOptionError extends ErrorWithHelp {
  constructor(rawOptions: string[], operation: string, option: string) {
    super(rawOptions, `Invalid option "${option}" for "${operation}"`)
  }
}

export function isBeagleCliError(error: any) {
  return error.exitCode === BEAGLE_EXIT_CODE
}
