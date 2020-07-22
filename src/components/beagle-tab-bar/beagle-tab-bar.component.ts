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

import { Component, Input, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { ItemTitle, BeagleTabBarInterface } from '../schemas/tab-bar'

@Component({
  selector: 'beagle-tab-bar',
  templateUrl: './beagle-tab-bar.component.html',
  styleUrls: ['./beagle-tab-bar.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleTabBarComponent extends BeagleComponent
implements BeagleTabBarInterface {

  @Input() onTabSelection?: (item) => void
   
  @Input() currentTab?: number
  @Input() items: ItemTitle[]

  constructor() {
    super()
  }

  /** @deprecated since v4. This parameter is no longer used */
  
  changeSelectedTab(selectedTab: number) {
    this.onTabSelection && this.onTabSelection(selectedTab)
  }
}
