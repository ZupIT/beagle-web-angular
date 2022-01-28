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
import {
  kebabToCamelCase,
  removeExtraIndentation,
  replaceToUnderline,
} from '../../utils/formatting'
import { getComponentAnnotations } from '../../utils/metadata'
import { remoteViewSelector } from '../../../constants'

function createViewChildString(name: string, templateName: string, angularVersion: number): string {
  const componentName = replaceToUnderline(name)

  if (angularVersion >= 8) {
    return `'${componentName}': new ViewChild('${templateName}', { static: true })`
  } else {
    return `'${componentName}': new ViewChild('${templateName}')`
  }
}

function createQueries(components: Record<string, Type<any>>, angularVersion: number) {
  const componentNames = Object.keys(components)

  return componentNames.map((name) => {
    const selector = getComponentAnnotations(components[name]).selector
    const templateName = kebabToCamelCase(selector)
    return createViewChildString(name, templateName, angularVersion)
  })
}


export function createComponentString(
  components: Record<string, Type<any>>,
  angularVersion: number,
) {
  const queries = createQueries(components, angularVersion)
  const componentString = `
    @Component({
      selector: '${remoteViewSelector}',
      template,
      inputs: ['route', 'controllerId'],
      queries: {
        ${queries.join(',\n        ')},
      },
    })
    export class BeagleRemoteView extends AbstractBeagleRemoteView {
      constructor(
        beagleProvider: BeagleProvider,
        navigatorService: BeagleAngularNavigatorService,
        ngZone: NgZone,
        changeDetector: ChangeDetectorRef,
      ) {
        // @ts-ignore
        super(beagleProvider, navigatorService, ngZone, changeDetector)
      }
    }
  `

  return removeExtraIndentation(componentString, 4)
}
