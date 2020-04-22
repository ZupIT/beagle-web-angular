/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import runInit from './init'
import runViewEngine from './view-engine'
import runHelp from './help'
import { CliOperation } from '../types'

const cliOperations: Record<string, CliOperation> = {
  init: {
    description: 'Runs a wizard to automatically set up Beagle for you.',
    run: runInit,
  },
  'view-engine': {
    description: 'Generates all the code you need when using Angular\'s View Engine. This is not necessary when using Ivy.',
    options: [
      {
        name: '--npm',
        description: 'optional. Forces use of npm instead of yarn.',
      },
      {
        name: '--config',
        description: 'optional. Path (relative to the project\'s root) to the view engine configuration file.',
        example: '--config=path/to/config'
      },
      {
        name: '--input',
        description: 'optional. Path (relative to the project\'s root) to the file with the beagle module.',
        example: '--input=path/to/beagle_module'
      },
      {
        name: '--output',
        description: 'optional. Path (relative to the project\'s root) to write the generated file.',
        example: '--output=path/to/output'
      },
    ],
    run: runViewEngine,
  },
  help: {
    description: 'shows every command you can run with the beagle-cli',
    run: () => runHelp(cliOperations),
  }
}

export default cliOperations
