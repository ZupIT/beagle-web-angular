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
import { BeagleListViewInterface, Direction } from '../schemas/list-view'
import { BeagleListViewScroll } from './beagle-list-view.scroll'

@Component({
  selector: 'beagle-list-view',
  templateUrl: './beagle-list-view.component.html',
  styleUrls: ['./beagle-list-view.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleListViewComponent
  extends BeagleListViewScroll
  implements BeagleListViewInterface, OnChanges
{
  @Input() direction: Direction
  @Input() dataSource: any[]
  @Input() iteratorName?: string
  @Input() template: BeagleUIElement
  @Input() onInit?: () => void
  @Input() onScrollEnd?: () => void
  @Input() scrollEndThreshold?: number
  @Input() useParentScroll?: boolean
  @Input() key?: string
  @Input() __suffix__?: string
  @HostBinding('class') hasScrollClass = ''

  constructor(element: ElementRef, ngZone: NgZone) {
    super(element, ngZone)
  }

  ngOnInit() {
    super.ngOnInit()
    this.scrollEndThreshold = this.scrollEndThreshold || 100
    this.direction = this.direction || 'VERTICAL'
  }

  assignIdsToListViewContent(
    content: BeagleUIElement,
    iterationKey: string,
    listViewId: string,
    listViewTag: string,
  ) {
    Tree.forEach(content, (component, componentIndex) => {
      const suffix = this.__suffix__ || ''
      const baseId = component.id ? `${component.id}${suffix}` : `${listViewId}:${componentIndex}`
      component.id = `${baseId}:${iterationKey}`
      if (component._beagleComponent_.toLowerCase() === listViewTag) {
        component.__suffix__ = `${suffix}:${iterationKey}`
      }
    })
  }

  renderDataSource() {
    const element = this.getViewContentManager().getElement()
    if (!element || !Array.isArray(this.dataSource)) return
    const contextId = this.iteratorName || 'item'
    const listViewTag = element._beagleComponent_.toLowerCase()
    const listViewId = element.id
    
    // @ts-ignore: at this point, element.children won't have ids and it's ok.
    element.children = this.dataSource.map((item, index) => {
      const child = Tree.clone(this.template)
      const iterationKey = this.key && item[this.key] !== undefined ? item[this.key] : index
      child._implicitContexts_ = [{ id: contextId, value: item }]
      this.assignIdsToListViewContent(child, iterationKey, listViewId, listViewTag)
      return child
    })

    const isAllEmpty = (!element.children || !element.children.length) && !this.dataSource.length
    if (!isAllEmpty) {
      this.getViewContentManager().getView().getRenderer().doFullRender(element, element.id)
    }

    // If the dataSource comes from a context, it might be initially empty, so the closes
    // scroll is one, when the data actually comes, the closes scroll may change, so to guarantee
    // the scroll will work as expected, we call verifyChangedParent every time the dataSource
    // is changed
    this.verifyChangedParent()
    this.allowOnScrollEnd()
    this.runOnScrollEndIfNotScrollable()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['dataSource'] || !this.getViewContentManager) return
    const current = JSON.stringify(changes['dataSource'].currentValue)
    const prev = JSON.stringify(changes['dataSource'].previousValue)
    if (prev !== current) this.renderDataSource()
  }
}
