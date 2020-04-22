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

import { existsSync } from 'fs'
import { basename, dirname } from 'path'
import { defaultViewEngineConfig } from '../view-engine/config'
import { getUserInput } from '../../utils/userInput'
import { InitApplicationData } from '../../types'

type UserInputValues = Pick<
  InitApplicationData,
  'beagleModulePath'
  | 'outputPath'
  | 'componentsModulePath'
  | 'componentsModuleName'
  | 'baseUrl'
  | 'isNpm'
  | 'isBeagleModuleCreated'
>

const DEFAULT_COMPONENTS_MODULE_PATH = 'src/app/beagle-components.module.ts'
const DEFAULT_COMPONENTS_MODULE_NAME = 'BeagleComponentsModule'

function askAboutDependencyManager() {
  function validation(answer: string) {
    if (answer === 'npm' || answer === 'yarn') return null
    return 'Invalid input. Please choose between yarn and npm.'
  }

  return getUserInput({
    question: 'Would you like to use yarn or npm?',
    validation,
  })
}

async function askAboutBeagleModule() {
  const beagleModulePath = await getUserInput({
    question: 'Path to the beagle module (press enter to use default):',
    defaultValue: defaultViewEngineConfig.beagleModulePath,
  })

  const outputFilename = `.${basename(beagleModulePath).replace(/\.ts$/, '.generated.ts')}`

  return {
    beagleModulePath,
    outputPath: `${dirname(beagleModulePath)}/${outputFilename}`,
    isBeagleModuleCreated: existsSync(`${process.cwd()}/${beagleModulePath}`),
  }
}

async function askAboutComponentsModule() {
  const componentsModulePath = await getUserInput({
    question: 'Path to the module with the components to use with beagle (press enter to use default):',
    defaultValue: DEFAULT_COMPONENTS_MODULE_PATH,
  })

  let componentsModuleName = DEFAULT_COMPONENTS_MODULE_NAME
  if (componentsModulePath !== DEFAULT_COMPONENTS_MODULE_PATH) {
    componentsModuleName = await getUserInput({
      question: 'Name of the module with the components to use with beagle (press enter to use default):',
      defaultValue: DEFAULT_COMPONENTS_MODULE_NAME,
    })
  }

  return { componentsModulePath, componentsModuleName }
}

function askAboutBackendUrl() {
  return getUserInput(
    'What\'s the base url of the backend providing your beagle JSONs? (press enter to use default):',
  )
}

async function askUserForApplicationData(): Promise<UserInputValues> {
  const isNpm = (await askAboutDependencyManager()) === 'npm'
  const { beagleModulePath, outputPath, isBeagleModuleCreated } = await askAboutBeagleModule()
  if (isBeagleModuleCreated) return { beagleModulePath, outputPath, isNpm, isBeagleModuleCreated }
  const { componentsModulePath, componentsModuleName } = await askAboutComponentsModule()
  const baseUrl = await askAboutBackendUrl()
  console.log('')
  return {
    beagleModulePath,
    outputPath,
    componentsModulePath,
    componentsModuleName,
    baseUrl,
    isNpm,
    isBeagleModuleCreated,
  }
}

export default askUserForApplicationData
