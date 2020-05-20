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

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BeagleButtonComponent } from './beagle-button/beagle-button.component'
import { BeagleListViewComponent } from './beagle-list-view/beagle-list-view.component'
import { BeagleTextComponent } from './beagle-text/beagle-text.component'
import { BeagleContainerComponent } from './beagle-container/beagle-container.component'
import { BeaglePageViewComponent } from './beagle-page-view/beagle-page-view.component'
import { BeagleImageComponent } from './beagle-image/beagle-image.component'
import { BeagleLoadingComponent } from './beagle-loading/beagle-loading.component'
import { BeagleLazyComponent } from './beagle-lazy/beagle-lazy.component'
import { BeagleTabItemComponent } from './beagle-tab-item/beagle-tab-item.component'
import { BeagleTabViewComponent } from './beagle-tab-view/beagle-tab-view.component'
import { BeagleErrorComponent } from './beagle-error/beagle-error.component'
import { TabsService } from './services/tabs.service'

const components = [
  BeagleButtonComponent,
  BeagleListViewComponent,
  BeagleTextComponent,
  BeagleContainerComponent,
  BeaglePageViewComponent,
  BeagleImageComponent,
  BeagleLazyComponent,
  BeagleLoadingComponent,
  BeagleTabItemComponent,
  BeagleTabViewComponent,
  BeagleErrorComponent,
]

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule],
  providers: [TabsService],
})
export class BeagleDefaultComponentsModule { }
