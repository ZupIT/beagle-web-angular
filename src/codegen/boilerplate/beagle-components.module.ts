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

import { removeExtraIndentation } from '../utils/formatting'

function createBoilerplate(isIvy: boolean, moduleName: string) {
  const code = `
    import { NgModule, Type } from '@angular/core'
    // import all the components you're going to use with beagle
    
    const components: Type<any>[] = [
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
