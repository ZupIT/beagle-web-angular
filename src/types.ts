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
  getConfig: () => BeagleAngularConfig<Schema>,
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

enum NavigationType {
  OPEN_DEEP_LINK,
  ADD_VIEW,
  SWAP_VIEW,
  FINISH_VIEW,
  POP_VIEW,
  POP_TO_VIEW,
  PRESENT_VIEW
}

type NavigateAction = {
  type: NavigationType,
  shouldPrefetch?: boolean,
  path?: string,
  data?: Record<string, string>,
  screen?: any,
}

type ShowNativeDialog =  {
  title: string,
  message: string,
  buttonText: string,
}

type CustomAction = {
  name: string,
  data: Record<string, string>,
}

export type Action = NavigateAction | ShowNativeDialog | CustomAction

export enum TextAlignment {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  INHERIT = 'inherit',
}

export enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface NavigationBarItem {
  text: string,
  image?: string,
  action: Action,
}

export interface NavigationBar {
  title: string,
  showBackButton: boolean,
  theme?: string,
  navigationBarItems?: NavigationBarItem[],
}

export interface PageIndicator {
  selectedColor: string,
  unselectedColor: string,
}
