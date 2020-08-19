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
  HostBinding,
} from '@angular/core'
import { BeagleUIElement, Tree } from '@zup-it/beagle-web'
import { BeagleFutureListViewInterface, Direction } from '../schemas/list-view'
import { BeagleListViewScroll } from './beagle-list-view.scroll'

@Component({
  selector: 'beagle-future-list-view',
  templateUrl: './beagle-list-view.component.html',
  styleUrls: ['./beagle-list-view.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleFutureListViewComponent
  extends BeagleListViewScroll
  implements BeagleFutureListViewInterface, OnChanges
{
  @Input() direction: Direction
  @Input() dataSource: any[]
  @Input() iteratorName?: string
  @Input() template: BeagleUIElement
  @Input() onInit?: () => void
  @Input() onScrollEnd?: () => void
  @Input() scrollEndThreshold?: number
  @Input() useParentScroll?: boolean
  @HostBinding('class') hasScrollClass = ''

  private hasRenderedDataSource = false

  constructor(element: ElementRef, ngZone: NgZone) {
    super(element, ngZone)
  }

  ngOnInit() {
    super.ngOnInit()
    this.scrollEndThreshold = this.scrollEndThreshold || 100
    this.direction = this.direction || 'VERTICAL'
  }

  ngAfterViewInit() {
    super.ngAfterViewInit()
    if (!this.hasRenderedDataSource) this.renderDataSource()
  }

  renderDataSource() {
    const element = this.getBeagleContext().getElement()
    if (!element || !Array.isArray(this.dataSource)) return
    const contextId = this.iteratorName || 'item'

    // @ts-ignore: at this point, element.children won't have ids and it's ok.
    element.children = this.dataSource.map((item, index) => {
      const child = Tree.clone(this.template)
      child._implicitContexts_ = [{ id: contextId, value: item }]
      child.id = child.id || `${element.id}_${index}`
      return child
    })

    this.getBeagleContext().getView().getRenderer().doFullRender(element, element.id)
    this.hasRenderedDataSource = true

    // If the dataSource comes from a context, it might be initially empty, so the closes
    // scroll is one, when the data actually comes, the closes scroll may change, so to guarantee
    // the scroll will work as expected, we call verifyChangedParent every time the dataSource
    // is changed
    this.verifyChangedParent()
    this.allowOnScrollEnd()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['dataSource'] || !this.getBeagleContext) return
    const current = JSON.stringify(changes['dataSource'].currentValue)
    const prev = JSON.stringify(changes['dataSource'].previousValue)
    if (prev !== current) this.renderDataSource()
  }
}
