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
    BeaglePageViewComponent,
    BeagleImageComponent,
    BeagleTabViewComponent,
    BeagleTabItemComponent,
    BeagleErrorComponent,
    BeagleLoadingComponent,
    BeagleTouchableComponent,
} from '../../components'

import { convertComponentsToCustom } from '@zup-it/beagle-web'

const defaultComponents: Record<string, Type<any>> = {
    'beagle:component:button': BeagleButtonComponent,
    'beagle:component:text': BeagleTextComponent,
    'beagle:component:listview': BeagleListViewComponent,
    'beagle:component:container': BeagleContainerComponent,
    'beagle:component:screencomponent': BeagleContainerComponent,
    'beagle:component:pageview': BeaglePageViewComponent,
    'beagle:component:image': BeagleImageComponent,
    'beagle:component:tabview': BeagleTabViewComponent,
    'beagle:component:tabitem': BeagleTabItemComponent,
    'beagle:component:scrollview': BeagleContainerComponent,
    'beagle:component:touchable': BeagleTouchableComponent,
    error: BeagleErrorComponent,
    loading: BeagleLoadingComponent,
}

export function combineUserAndDefaultComponents(components: Record<string, Type<any>>) {
    return { ...defaultComponents, ...convertComponentsToCustom(components) }
}

export function shouldImportDefaultModule(components: Record<string, Type<any>>) {
    const defaultComponentNames = Object.keys(defaultComponents)
    return defaultComponentNames.some(name => !components[name])
}
