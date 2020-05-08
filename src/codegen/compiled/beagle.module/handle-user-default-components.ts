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

import { Type } from '@angular/core'
import {
    BeagleButtonComponent,
    BeagleTextComponent,
    BeagleListViewComponent,
    BeagleContainerComponent,
    BeagleScreenComponent,
    BeaglePageViewComponent,
    BeagleImageComponent,
    BeagleTabViewComponent,
    BeagleTabItemComponent,
    BeagleErrorComponent,
} from '../../../beagle-default-components'

const defaultComponents: Record<string, Type<any>> = {
    'beagle:component:button': BeagleButtonComponent,
    'beagle:component:text': BeagleTextComponent,
    'beagle:component:listview': BeagleListViewComponent,
    'beagle:component:container': BeagleContainerComponent,
    'beagle:component:screen': BeagleScreenComponent,
    'beagle:component:pageview': BeaglePageViewComponent,
    'beagle:component:networkimage': BeagleImageComponent,
    'beagle:component:image': BeagleImageComponent,
    'beagle:component:tabview': BeagleTabViewComponent,
    'beagle:component:tabitem': BeagleTabItemComponent,
    error: BeagleErrorComponent,
}

export function combineUserAndDefaultComponents(components: Record<string, Type<any>>) {
    return Object.assign(defaultComponents, components)
}

export function addDefaultModule(components: Record<string, Type<any>>) {
    const defaultKeys = Object.keys(defaultComponents)
    const userKeys = Object.keys(components)
    const hasDefaultComponents = defaultKeys.map((item) => userKeys.indexOf(item))
    return hasDefaultComponents.includes(-1)
}
