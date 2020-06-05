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
  Component, Input, ViewEncapsulation,
  OnInit, AfterViewInit, ElementRef, NgZone, OnChanges, SimpleChanges,
} from '@angular/core'
import { EventHandler, replaceBindings, BeagleUIElement } from '@zup-it/beagle-web'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { BeagleListViewInterface } from '../schemas/list-view'

@Component({
  selector: 'beagle-list-view',
  templateUrl: './beagle-list-view.component.html',
  styleUrls: ['./beagle-list-view.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleListViewComponent extends BeagleComponent
  implements BeagleListViewInterface, AfterViewInit,
  OnInit, OnChanges {

  @Input() dataSource: any[]
  @Input() template: BeagleUIElement
  @Input() onInit?: () => void
  eventHandler: EventHandler
  hasInitialized = false
  usedDataSource: any[]

  constructor(private element: ElementRef,
    private ngZone: NgZone) {
    super()
    console.log('!!!!! constructor this.dataSource', this.dataSource)
  }

  ngOnInit() {
    console.log('onInit this.dataSource', this.dataSource)
  }

  ngAfterViewInit() {
    this.verifyCallingOnInit()
  }

  ngAfterViewChecked() {
    console.log('dentro no ngAfterViewChecked')
    if (!this.hasInitialized && this.onInit) {
      // this.ngZone.runOutsideAngular(() => {
      //   setTimeout(() => {
      this.verifyCallingOnInit()
      //   }, 5)
      // })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Current changes', changes['dataSource']?.currentValue)
    console.log('previous changes', changes['dataSource']?.previousValue)
    if ('dataSource' in changes &&
      JSON.stringify(changes['dataSource'].currentValue) !==
      JSON.stringify(changes['dataSource'].previousValue)) {
      const tree = this.getBeagleContext().getElement()
      console.log('*** tree antes', tree)
      if (tree) {
        this.usedDataSource = this.dataSource
        const parsedTree = this.dataSource.map((item) => replaceBindings(this.template,
          [{ id: 'item', value: item }]))
        tree.children = parsedTree
        console.log('*** updateWithTree tree depois', tree)
        this.getBeagleContext().updateWithTree({
          sourceTree: tree,
        })
      }
    } else {
      console.log('no else')
    }
  }

  verifyCallingOnInit() {
    if (!this.hasInitialized && this.isRendered()) {
      this.hasInitialized = true
      if (this.onInit) this.onInit()
    }
  }

  isRendered() {
    return this.element.nativeElement.parentNode !== null
  }
}
