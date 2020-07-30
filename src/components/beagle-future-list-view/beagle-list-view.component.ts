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
  Component,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  NgZone,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core'
import { BeagleUIElement } from '@zup-it/beagle-web'
import Expression from '@zup-it/beagle-web/Renderer/Expression'
import Tree from '@zup-it/beagle-web/utils/Tree'
import { clone } from '@zup-it/beagle-web/utils/tree-manipulation'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { BeagleFutureListViewInterface, Direction } from '../schemas/list-view'

@Component({
  selector: 'beagle-future-list-view',
  templateUrl: './beagle-list-view.component.html',
  styleUrls: ['./beagle-list-view.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleFutureListViewComponent extends BeagleComponent
  implements BeagleFutureListViewInterface, AfterViewChecked, OnChanges, AfterViewInit {

  @Input() direction: Direction
  @Input() dataSource: any[]
  @Input() template: BeagleUIElement
  @Input() onInit?: () => void
  private hasInitialized = false
  private hasRenderedDataSource = false

  constructor(
    private element: ElementRef, 
    private ngZone: NgZone) {
    super()
  }

  ngAfterViewChecked() {
    if (!this.hasInitialized && this.onInit) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.verifyCallingOnInit()
        }, 5)
      })
    }
  }

  renderDataSource() {
    const element = this.getBeagleContext().getElement()
    if (!element) return

    // @ts-ignore: at this point, element.children won't have ids and it's ok.
    element.children = this.dataSource.map((item) => {
      const child = clone(this.template)
      return Tree.replaceEach(child, component => (
        Expression.resolveForComponent(component, [{ id: 'item', value: item }])
      ))
    })

    this.getBeagleContext().getView().getRenderer().doFullRender(element, element.id)
    this.hasRenderedDataSource = true
  }

  ngAfterViewInit() {
    if (!this.hasRenderedDataSource) this.renderDataSource()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['dataSource'] || !this.getBeagleContext) return
    const current = JSON.stringify(changes['dataSource'].currentValue)
    const prev  = JSON.stringify(changes['dataSource'].previousValue)
    if (prev !== current) this.renderDataSource()
  }

  verifyCallingOnInit() {
    if (!this.hasInitialized && this.isRendered()) {
      this.hasInitialized = true
      if (this.onInit) this.onInit()
    }
  }

  isRendered() {
    return this.element.nativeElement.isConnected
  }
}
