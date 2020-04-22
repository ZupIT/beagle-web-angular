/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { Type } from '@angular/core'
import { DefaultSchema } from '@zup-it/beagle-web'
import 'reflect-metadata'
import { BeagleAngularConfig } from './types'

export function BeagleModule<Schema = DefaultSchema>(config: BeagleAngularConfig<Schema>) {
  return function (target: Type<any>) {
    Reflect.defineMetadata('beagleConfig', config, target)
  }
}

export function getBeagleConfigMetadata(beagleModuleClass: Type<any>) {
  return Reflect.getMetadata('beagleConfig', beagleModuleClass)
}
