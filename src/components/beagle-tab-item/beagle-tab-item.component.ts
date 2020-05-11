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

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { TabsService } from '../tabs.service'

@Component({
  selector: 'beagle-tab-item',
  templateUrl: './beagle-tab-item.component.html',
  styleUrls: ['./beagle-tab-item.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleTabItemComponent extends BeagleComponent {
  @Input() title?: string
  @Input() icon?: string

  constructor(private tabsService: TabsService) {
    super()
  }

  handleClick() {
    const item = this.getBeagleContext().getElementId()
    this.tabsService.changeSelectedTab(item)
  }
}