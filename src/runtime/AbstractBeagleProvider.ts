/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import createCoreBeagleUIService, { DefaultSchema } from '@zup-it/beagle-web'
import { BeagleAngularConfig, BeagleAngularUIService } from '../types'

export abstract class AbstractBeagleProvider {
  private service: BeagleAngularUIService | undefined

  start<Schema = DefaultSchema>(config: BeagleAngularConfig<Schema>) {
    if (this.service) {
      console.error('Beagle service has already started!')
      return
    }
    // @ts-ignore // fixme
    this.service = createCoreBeagleUIService<Schema>(config)
  }

  getBeagleUIService() {
    return this.service
  }
}
