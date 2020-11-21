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
  BeagleFutureListViewComponent,
  BeagleContainerComponent,
  BeaglePageViewComponent,
  BeagleImageComponent,
  BeagleLazyComponent,
  BeagleTabViewComponent,
  BeagleTabItemComponent,
  BeagleErrorComponent,
  BeagleLoadingComponent,
  BeagleTouchableComponent,
  BeagleSimpleFormComponent,
  BeagleModalComponent,
  BeagleInputComponent,
  BeagleTextAreaComponent,
  BeaglePageIndicatorComponent,
  BeagleWebviewComponent,
  BeagleTabBarComponent,
  BeagleScreenComponent,
} from './components'

export const viewIdAttributeName = '__beagle_view_id'
export const remoteViewSelector = 'beagle-remote-view'
export const viewContentManagerSelector = 'beagle-content-manager'

const libRequiredComponents = {
  'custom:error': BeagleErrorComponent,
  'custom:loading': BeagleLoadingComponent,
}

const beagleDefaultComponents = {
  'beagle:button': BeagleButtonComponent,
  'beagle:text': BeagleTextComponent,
  'beagle:listview': BeagleListViewComponent,
  'beagle:futurelistview': BeagleFutureListViewComponent,
  'beagle:container': BeagleContainerComponent,
  'beagle:screencomponent': BeagleScreenComponent,
  'beagle:pageview': BeaglePageViewComponent,
  'beagle:image': BeagleImageComponent,
  'beagle:tabview': BeagleTabViewComponent,
  'beagle:tabitem': BeagleTabItemComponent,
  'beagle:tabbar': BeagleTabBarComponent,
  'beagle:scrollview': BeagleContainerComponent,
  'beagle:touchable': BeagleTouchableComponent,
  'beagle:lazycomponent': BeagleLazyComponent,
  'beagle:simpleform': BeagleSimpleFormComponent,
  'beagle:pageindicator': BeaglePageIndicatorComponent,
  'beagle:textInput': BeagleInputComponent,
  'beagle:webview': BeagleWebviewComponent,
}

const webSpecificComponents = {
  'custom:modal': BeagleModalComponent,
  'custom:text-area': BeagleTextAreaComponent,
}

export const defaultComponents: Record<string, Type<any>> = {
  ...libRequiredComponents,
  ...beagleDefaultComponents,
  ...webSpecificComponents,
}
