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

import { CliOperation } from '../types'
import runInit from './init'
import runViewEngine from './view-engine'
import runHelp from './help'

const cliOperations: Record<string, CliOperation> = {
  init: {
    description: 'Runs a wizard to automatically set up Beagle for you.',
    run: runInit,
  },
  'view-engine': {
    description: `Generates all the code you need when using Angular\'s View Engine.
      This is not necessary when using Ivy.`,
    options: [
      {
        name: '--npm',
        description: 'optional. Forces use of npm instead of yarn.',
      },
      {
        name: '--config',
        description: `optional. Path (relative to the project\'s root)
          to the view engine configuration file.`,
        example: '--config=path/to/config',
      },
      {
        name: '--input',
        description: `optional. Path (relative to the project\'s root)
          to the file with the beagle module.`,
        example: '--input=path/to/beagle_module',
      },
      {
        name: '--output',
        description: `optional. Path (relative to the project\'s root)
          to write the generated file.`,
        example: '--output=path/to/output',
      },
    ],
    run: runViewEngine,
  },
  help: {
    description: 'shows every command you can run with the beagle-cli',
    run: () => runHelp(cliOperations),
  },
}

export default cliOperations
