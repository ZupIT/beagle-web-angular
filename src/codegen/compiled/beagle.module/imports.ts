/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
