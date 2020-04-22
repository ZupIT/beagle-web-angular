/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { existsSync, writeFileSync } from 'fs'
import { logInfo } from '../../utils/styledLogger'
import { ensureDirectoryExistence, getImportFilePath } from '../../utils/filesystem'
import { InitApplicationData, AngularEngine } from '../../types'
import createBeagleModuleBoilerplate from '../../../codegen/boilerplate/beagle.module'
import createComponentsModuleBoilerplate from '../../../codegen/boilerplate/beagle-components.module'

interface BeagleFileParams {
  beagleModulePath: string,
  componentsModulePath: string,
  componentsModuleName: string,
  baseUrl?: string,
}


function createBeagleFile(params: BeagleFileParams) {
  const root = process.cwd()
  const fullPath = `${root}/${params.beagleModulePath}`
  const importPath = getImportFilePath(params.beagleModulePath, params.componentsModulePath)
  
  const boilerplate = createBeagleModuleBoilerplate(
    importPath,
    params.componentsModuleName,
    params.baseUrl,
  )

  ensureDirectoryExistence(fullPath)
  writeFileSync(fullPath, boilerplate, { encoding: 'utf8' })
}

function createComponentsFile(
  pathRelativeToRoot: string,
  angularEngine: AngularEngine,
  componentsModuleName: string,
) {
  const root = process.cwd()
  const fullPath = `${root}/${pathRelativeToRoot}`
  
  const boilerplate = createComponentsModuleBoilerplate(
    angularEngine === 'Ivy',
    componentsModuleName,
  )

  ensureDirectoryExistence(fullPath)
  writeFileSync(fullPath, boilerplate, { encoding: 'utf8' })
}

function createBoilerplate({
  angularEngine,
  beagleModulePath,
  baseUrl,
  componentsModuleName,
  componentsModulePath,
}: Required<InitApplicationData>) {
  const root = process.cwd()
  const componentsFullPath = `${root}/${componentsModulePath}`

  if (!existsSync(componentsFullPath)) {
    createComponentsFile(componentsModulePath, angularEngine, componentsModuleName)
    logInfo(`Components module successfully created at "${componentsFullPath}"`)
  }

  createBeagleFile({
    beagleModulePath,
    componentsModulePath,
    componentsModuleName,
    baseUrl,
  })

  logInfo(`Beagle module successfully created at "${root}/${beagleModulePath}"`)
}

export default createBoilerplate
