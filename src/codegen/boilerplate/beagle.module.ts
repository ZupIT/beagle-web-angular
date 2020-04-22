/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { removeExtraIndentation } from '../utils/formatting'

function createBoilerplate(
  componentsModuleImportPath: string,
  componentsModuleName: string,
  baseUrl = '',
) {
  const code = `
    import { BeagleModule } from '@zup-it/beagle-angular'
    // import all the components you wish to use with Beagle. See the examples below:
    // import { LoadingComponent } from './components/loading/loading.component'
    // import { ErrorComponent } from './components/error/error.component'
    
    @BeagleModule({
      baseUrl: '${baseUrl}',
      module: {
        path: '${componentsModuleImportPath}',
        name: '${componentsModuleName}',
      },
      components: {
        // Associate every beagle component to your angular component. See the examples below:
        loading: class Loading {}, // todo: replace by actual component class
        error: class Error {}, // todo: replace by actual component class
      },
    })
    export class Beagle {}
  `

  return `${removeExtraIndentation(code, 4)}\n`
}

export default createBoilerplate
