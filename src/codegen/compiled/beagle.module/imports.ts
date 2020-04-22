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
import { removeExtraIndentation } from '../../utils/formatting'

interface Params {
  componentsModuleName: string,
  componentsModulePath: string,
  beagleModuleName: string,
  beagleModuleCopyPath: string,
}

export const originalBeagleModuleName = 'OriginalBeagleModule'

export function createImportsString({
  componentsModuleName,
  componentsModulePath,
  beagleModuleName,
  beagleModuleCopyPath,
}: Params) {
  const componentModuleImport = `import { ${componentsModuleName} } from '${componentsModulePath}'`
  const originalBeagleModuleImport = `import { ${beagleModuleName} as ${originalBeagleModuleName} } from '${beagleModuleCopyPath}'`

  const importString = `
    import {
      Component,
      NgModule,
      ViewChild,
      NgZone,
      ChangeDetectorRef,
      Injectable,
    } from '@angular/core'
    import {
      AbstractBeagleRemoteView,
      AbstractBeagleProvider,
      BeagleContextModule,
      getBeagleConfigMetadata,
    } from '@zup-it/beagle-angular'
    import { CommonModule } from '@angular/common'
    ${componentModuleImport}
    ${originalBeagleModuleImport}
  `

  return removeExtraIndentation(importString, 4)
}
