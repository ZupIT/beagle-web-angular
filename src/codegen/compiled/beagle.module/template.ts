/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { Type } from '@angular/core'
import { removeExtraIndentation } from '../../utils/formatting'
import { getComponentAnnotations, getComponentInputs } from '../../utils/metadata'
import { createRemoteViewTemplate } from '../../utils/template-builder'

export function createTemplateString(components: Type<any>[]) {
  const beagleTypes = Object.keys(components)
  const infos = beagleTypes.map(beagleType => ({
    beagleType,
    selector: getComponentAnnotations(components[beagleType]).selector,
    inputs: getComponentInputs(components[beagleType]),
  }))

  const { componentTemplates, containerTemplate } = createRemoteViewTemplate(infos)
  const ngTemplates = removeExtraIndentation(componentTemplates.join(''), 2)
  const ngContainer = removeExtraIndentation(containerTemplate, 2)

  return `const template = \`\n${ngTemplates}\n${ngContainer}\n\``
}
