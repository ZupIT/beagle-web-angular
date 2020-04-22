/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
