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

async function getBeagleModuleInfo() {
  const outputFilename = `.${basename(defaultViewEngineConfig.beagleModulePath).replace(/\.ts$/, '.generated.ts')}`
  
  return {
    beagleModulePath: defaultViewEngineConfig.beagleModulePath,
    outputPath: `${dirname(defaultViewEngineConfig.beagleModulePath)}/${outputFilename}`,
    isBeagleModuleCreated: existsSync(`${process.cwd()}/${defaultViewEngineConfig.beagleModulePath}`),
  }
}

async function askUserForApplicationData(): Promise<UserInputValues> {
  const isNpm = (await askAboutDependencyManager()) === 'npm'
  const { beagleModulePath, outputPath, isBeagleModuleCreated } = await getBeagleModuleInfo()
  if (isBeagleModuleCreated) return { beagleModulePath, outputPath, isNpm, isBeagleModuleCreated }
  const componentsModulePath = 'src/app/beagle-components.module.ts'
  const componentsModuleName = 'BeagleComponentsModule'
  const baseUrl = 'http://usebeagle.io.s3-website-sa-east-1.amazonaws.com/start/'
  
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
