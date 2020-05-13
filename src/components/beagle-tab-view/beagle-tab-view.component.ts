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

import {
  Component, AfterViewInit, ViewChild, 
  Input, OnInit, ViewEncapsulation,
} from '@angular/core'
import { TabsService } from '../services/tabs.service'

@Component({
  selector: 'beagle-tab-view',
  templateUrl: './beagle-tab-view.component.html',
  styleUrls: ['./beagle-tab-view.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleTabViewComponent implements AfterViewInit, OnInit {
  @Input() styleId?= ''
  @ViewChild('contentItens') contentItens
  activeTab = ''

  constructor(
    private tabsService: TabsService) {
  }

  ngOnInit() {
    this.listenTabChanges()
  }

  ngAfterViewInit() {
    if (this.contentItens) this.initializeTabSelected()
  }

  listenTabChanges() {
    this.tabsService.notifySelectedTab().subscribe((selected) => {
      this.initializeTabSelected()
    })
  }

  initializeTabSelected() {
    if (this.contentItens) {
      const elements: Element[] = Array.from(this.contentItens.nativeElement.children)
      elements.forEach((item, index) => {
        const viewId = item.getAttribute('ng-reflect-_element-id')
        if (this.activeTab === '' && index === 0) {
          this.activeTab = viewId || ''
          this.tabsService.changeSelectedTab(this.activeTab)
        }
      })
    }
  }
}
