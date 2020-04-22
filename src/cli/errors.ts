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
