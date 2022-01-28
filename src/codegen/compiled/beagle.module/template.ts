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

import { Type } from '@angular/core'
import { removeExtraIndentation } from '../../utils/formatting'
import { getComponentAnnotations, getComponentInputs } from '../../utils/metadata'
import { createRemoteViewTemplate } from '../../utils/template-builder'

export function createTemplateString(components: Type<any>[]) {
  const uniqueComponents = [...new Set(components)]
  const beagleTypes = Object.keys(uniqueComponents)
  const infos = beagleTypes.map(beagleType => ({
    beagleType,
    selector: getComponentAnnotations(uniqueComponents[beagleType]).selector,
    inputs: getComponentInputs(uniqueComponents[beagleType]),
  }))

  const { componentTemplates, containerTemplate } = createRemoteViewTemplate(infos)
  const ngTemplates = removeExtraIndentation(componentTemplates.join(''), 2)
  const ngContainer = removeExtraIndentation(containerTemplate, 2)

  return `const template = \`\n${ngTemplates}\n${ngContainer}\n\``
}
