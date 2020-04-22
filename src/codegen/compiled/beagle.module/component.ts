/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { Type } from '@angular/core'
import { kebabToCamelCase, removeExtraIndentation } from '../../utils/formatting'
import { getComponentAnnotations } from '../../utils/metadata'
import { remoteViewSelector } from '../../../constants'


function createViewChildString(name: string, templateName: string, angularVersion: number): string {
  if (angularVersion >= 8) {
    return `'${name}': new ViewChild('${templateName}', { static: true })`
  } else {
    return `'${name}': new ViewChild('${templateName}')`
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


export function createComponentString(components: Record<string, Type<any>>, angularVersion: number) {
  const queries = createQueries(components, angularVersion)

  const componentString = `
    @Component({
      selector: '${remoteViewSelector}',
      template,
      inputs: ['loadParams'],
      queries: {
        ${queries.join(',\n        ')},
      },
    })
    export class BeagleRemoteView extends AbstractBeagleRemoteView {
      constructor(
        beagleProvider: BeagleProvider,
        ngZone: NgZone,
        changeDetector: ChangeDetectorRef,
      ) {
        // @ts-ignore
        super(beagleProvider, ngZone, changeDetector)
      }
    }
  `

  return removeExtraIndentation(componentString, 4)
}
