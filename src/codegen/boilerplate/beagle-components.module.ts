/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { removeExtraIndentation } from '../utils/formatting'

function createBoilerplate(isIvy: boolean, moduleName: string) {
  const code = `
    import { NgModule } from '@angular/core'
    // import all the components you're going to use with beagle
    
    const components = [
      // your components
    ]
    
    @NgModule({
      declarations: components,
      ${isIvy ? '' : 'entryComponents: components,'}
      exports: components,
      imports: [
        // everything your components depend on
      ],
    })
    export class ${moduleName} {}
  `

  return `${removeExtraIndentation(code, 4)}\n`
}

export default createBoilerplate
