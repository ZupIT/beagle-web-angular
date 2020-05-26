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

const defaultComponents: Record<string, Type<any>> = {
    'beagle:button': BeagleButtonComponent,
    'beagle:text': BeagleTextComponent,
    'beagle:listview': BeagleListViewComponent,
    'beagle:container': BeagleContainerComponent,
    'beagle:screencomponent': BeagleContainerComponent,
    'beagle:pageview': BeaglePageViewComponent,
    'beagle:image': BeagleImageComponent,
    'beagle:tabview': BeagleTabViewComponent,
    'beagle:tabitem': BeagleTabItemComponent,
    'beagle:scrollview': BeagleContainerComponent,
    'beagle:touchable': BeagleTouchableComponent,
    error: BeagleErrorComponent,
    loading: BeagleLoadingComponent,
}

export function combineUserAndDefaultComponents(components: Record<string, Type<any>>) {
    return { ...defaultComponents, ...components }
}

export function shouldImportDefaultModule(components: Record<string, Type<any>>) {
    const defaultComponentNames = Object.keys(defaultComponents)
    return defaultComponentNames.some(name => !components[name])
}
