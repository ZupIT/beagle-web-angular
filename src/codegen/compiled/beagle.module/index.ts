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

import { createCommentaryString } from './commentary'
import { createImportsString } from './imports'
import { createTemplateString } from './template'
import { createProviderString } from './provider'
import { createComponentString } from './component'
import { createModuleString } from './module'
import { BeagleAngularConfig } from '../../../types'

interface CodeGenerationParams {
  config: BeagleAngularConfig<any>
  beagleModuleCopyPath: string,
  beagleModuleName: string,
  angularVersion: number,
}

export function generateViewEngineCode({
  config,
  beagleModuleCopyPath,
  beagleModuleName,
  angularVersion,
}: CodeGenerationParams) {
  const commentary = createCommentaryString()
  const importString = createImportsString({
    componentsModuleName: config.module.name,
    componentsModulePath: config.module.path,
    beagleModuleName,
    beagleModuleCopyPath,
  })
  const templateString = createTemplateString(Object.values(config.components))
  const componentString = createComponentString(config.components, angularVersion)
  const providerString = createProviderString()
  const moduleString = createModuleString({
    componentsModuleName: config.module.name,
    beagleModuleName,
  })

  return `${commentary}\n\n${importString}\n\n${templateString}\n\n${providerString}\n\n${componentString}\n\n${moduleString}\n`
}
