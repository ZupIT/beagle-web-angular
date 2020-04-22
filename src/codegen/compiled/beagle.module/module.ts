/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { originalBeagleModuleName } from './imports'
import { removeExtraIndentation } from '../../utils/formatting'

interface Params {
  componentsModuleName: string,
  beagleModuleName: string,
}

export function createModuleString({ componentsModuleName, beagleModuleName }: Params) {
  const moduleString = `
    @NgModule({
      declarations: [BeagleRemoteView],
      exports: [BeagleRemoteView],
      imports: [CommonModule, BeagleContextModule, ${componentsModuleName}],
      providers: [BeagleProvider],
    })
    export class ${beagleModuleName} {
      constructor(provider: BeagleProvider) {
        const config = getBeagleConfigMetadata(${originalBeagleModuleName})
        provider.start(config)
      }
    }
  `

  return removeExtraIndentation(moduleString, 4)
}
