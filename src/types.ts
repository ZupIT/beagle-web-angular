/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { Type } from '@angular/core'
import {
  BeagleConfig,
  BeagleUIService,
  DefaultSchema,
  LoadParams,
  IdentifiableBeagleUIElement,
  BeagleView,
} from '@zup-it/beagle-web'
import { UpdateWithTreeParams, Omit } from '@zup-it/beagle-web/dist/types'

export interface BeagleAngularConfig<Schema> extends BeagleConfig<Schema> {
  components: { error: Type<{}>, loading: Type<{}> } & {
    [K in keyof Schema]: Type<Schema[K]>
  },
  module: {
    path: string,
    name: string,
  },
}

export interface BeagleAngularUIService<Schema = DefaultSchema> extends BeagleUIService<Schema> {
  getConfig: () => BeagleAngularConfig<Schema>
}

export interface BeagleContext<T = any> {
  replace: (params: LoadParams<T>) => Promise<void>,
  append: (params: LoadParams<T>) => Promise<void>,
  prepend: (params: LoadParams<T>) => Promise<void>,
  updateWithTree: (params: Omit<UpdateWithTreeParams<T>, 'elementId'>) => void,
  getElementId: () => string,
  getElement: () => IdentifiableBeagleUIElement<T> | null,
  getView: () => BeagleView<T>,
}
