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

type NavigationType = 'OPEN_DEEP_LINK' | 'ADD_VIEW' | 'SWAP_VIEW' | 'FINISH_VIEW' |
    'POP_VIEW' | 'POP_TO_VIEW' | 'PRESENT_VIEW'

type NavigateAction = {
    type: NavigationType,
    shouldPrefetch?: boolean,
    path?: string,
    data?: Record<string, string>,
    screen?: any,
}

type ShowNativeDialog = {
    title: string,
    message: string,
    buttonText: string,
}

type CustomAction = {
    name: string,
    data: Record<string, string>,
}

export type Action = NavigateAction | ShowNativeDialog | CustomAction

export interface NavigationBarItem {
    text: string,
    image?: string,
    action: Action,
}

export interface NavigationBar {
    title: string,
    showBackButton: boolean,
    styleId?: string,
    navigationBarItems?: NavigationBarItem[],
}

export interface PageIndicator {
    selectedColor: string,
    unselectedColor: string,
}

export type ImageContentMode = 'FIT_XY' | 'FIT_CENTER' | 'CENTER_CROP' | 'CENTER'

export type TextAlignment = 'LEFT' | 'CENTER' | 'RIGHT' | 'INHERIT'

export type Direction = 'VERTICAL' | 'HORIZONTAL'
