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
  OnInit, AfterViewInit, ElementRef,
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
  implements BeagleListViewInterface, AfterViewInit {
  @Input() dataSource: any[]
  @Input() template: BeagleUIElement
  @Input() onInit?: () => void
  eventHandler: EventHandler
  hasInitialized = false

  constructor(private element: ElementRef) {
    super()
    console.log('no constructor')
  }

  ngOnInit() {
    console.log('no ngOnInit')
  }

  ngAfterViewInit() {
    console.log('no ngAfterViewInit')
    const tree = this.getBeagleContext().getElement()
    this.verifyCallingOnInit()
    if (this.dataSource && tree) {
      const parsedTree = this.dataSource.map((item) => replaceBindings(this.template,
        [{ id: 'item', value: item }]))
      tree.children = parsedTree

      this.getBeagleContext().updateWithTree({
        sourceTree: tree,
      })
    }
  }

  ngAfterViewChecked() {
    console.log('dentro no ngAfterViewChecked')
    this.verifyCallingOnInit()
  }

  verifyCallingOnInit() {
    if (!this.hasInitialized) {
      this.hasInitialized = true
      if (this.onInit) this.onInit()
    }
  }

}
