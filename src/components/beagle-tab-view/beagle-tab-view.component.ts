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
  Input, OnInit, ViewEncapsulation, OnDestroy,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { TabsService } from '../services/tabs.service'
import { BeagleTabViewInterface } from '../schemas/tab-view'

@Component({
  selector: 'beagle-tab-view',
  templateUrl: './beagle-tab-view.component.html',
  styleUrls: ['./beagle-tab-view.component.less'],
  encapsulation: ViewEncapsulation.None,
})
/**
 * @deprecated Since version 1.1. Will be deleted in version 2.0.
 * Consider replacing this component for a tabBar with a pageview.
*/
export class BeagleTabViewComponent implements
  BeagleTabViewInterface, AfterViewInit, OnInit, OnDestroy {

  @Input() styleId?= ''
  @ViewChild('contentItems') contentItems
  private activeTab = ''
  private selectedTabSubscription: Subscription

  constructor(private tabsService: TabsService) { }

  ngOnInit() {
    console.warn(`Tabview is deprecated. This will be removed in a future version.
    Please consider replacing this component for a tabBar with a pageview.`)
    this.listenTabChanges()
  }

  ngAfterViewInit() {
    if (this.contentItems) this.initializeTabSelected()
  }

  ngOnDestroy() {
    this.selectedTabSubscription && this.selectedTabSubscription.unsubscribe()
  }

  listenTabChanges() {
    this.selectedTabSubscription = this.tabsService.notifySelectedTab().subscribe((selected) => {
      this.initializeTabSelected()
    })
  }

  initializeTabSelected() {
    if (this.contentItems) {
      const elements: Element[] = Array.from(this.contentItems.nativeElement.children)
      elements.forEach((item, index) => {
        const viewId = item.getAttribute('data-beagle-id')
        if (this.activeTab === '' && index === 0) {
          this.activeTab = viewId || ''
          this.tabsService.changeSelectedTab(this.activeTab)
        }
      })
    }
  }
}
