/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { removeExtraIndentation } from '../../utils/formatting'

export function createProviderString() {
  const providerString = `
    @Injectable()
    export class BeagleProvider extends AbstractBeagleProvider {}
  `

  return removeExtraIndentation(providerString, 4)
}
