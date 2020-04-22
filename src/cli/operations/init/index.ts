/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { getAngularEngine, validateAngularVersion } from './angular'
import askUserForApplicationData from './questions'
import createBoilerplate from './boilerplate'
import handleIvy from './ivy'
import handleViewEngine from './view-engine'
import { InitApplicationData } from '../../types'

async function runInit() {
  validateAngularVersion()
  const angularEngine = getAngularEngine()
  const userInputData = await askUserForApplicationData()
  const applicationData: InitApplicationData = { ...userInputData, angularEngine }

  if (!applicationData.isBeagleModuleCreated) {
    createBoilerplate(applicationData as Required<InitApplicationData>)
  }

  if (angularEngine === 'Ivy') handleIvy(applicationData.isNpm)
  else handleViewEngine(applicationData)
}

export default runInit
