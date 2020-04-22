/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { undoViewEngineConfiguration } from './view-engine'
import { logSuccess } from '../../utils/styledLogger'

function handleIvy(isNpm: boolean) {
  const runCmd = isNpm ? 'npx' : 'yarn'
  undoViewEngineConfiguration(isNpm)
  logSuccess(`Beagle has detected you're using Ivy. No Further configuration is required! If you change to ViewEngine, be sure to re-run "${runCmd} beagle init".`)
}

export default handleIvy
