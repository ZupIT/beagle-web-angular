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

import { NavigationBar, PageIndicator } from '../types'
import { ImageContentMode, Direction, TextAlignment } from '../enums'

export default interface BeagleComponentsSchema {
  'beagle:component:button': {
    text: string,
    styleId?: string,
    onPress?: () => void,
    style?: Record<string, any>,
  },
  'beagle:component:container': {
    onInit?: () => void,
    style?: Record<string, any>,
  },
  error: {},
  'beagle:component:image': {
    name: string,
    contentMode?: ImageContentMode, //default é FIT_CENTER,
    style?: Record<string, any>,
  },
  'beagle:component:networkimage': {
    path: string,
    contentMode?: ImageContentMode, //default é FIT_CENTER,
    style?: Record<string, any>,
  },
  'beagle:component:listview': {
    direction: Direction,
  },
  loading: {},
  'beagle:component:pageview': {
    pageIndicator?: PageIndicator,
  },
  'beagle:component:screencomponent': {
    identifier?: string,
    navigationBar?: NavigationBar,
  },
  'beagle:component:tabitem': {
    title?: string,
    icon?: string,
  },
  'beagle:component:tabview': {
    styleId?: string,
  },
  'beagle:component:text': {
    text: string,
    styleId?: string,
    textColor?: string,
    alignment?: TextAlignment,
    style?: Record<string, any>,
  },

}
