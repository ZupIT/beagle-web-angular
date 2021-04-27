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
  ViewEncapsulation,
  NgZone,
  HostBinding,
  ViewChild,
} from '@angular/core'
import { BeagleUIElement, Tree } from '@zup-it/beagle-web'
import { BeagleListViewInterface, Direction } from '../../schemas/dynamic-list'
import { DynamicListScroll } from '../dynamic-list.scroll'

@Component({
  selector: 'beagle-list-view',
  templateUrl: './beagle-list-view.component.html',
  styleUrls: ['./beagle-list-view.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleListViewComponent
  extends DynamicListScroll
  implements BeagleListViewInterface, OnChanges {
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
  @Input() isScrollIndicatorVisible?: boolean
  @Input() numColumns?: number
  @HostBinding('class') hasScrollClass = ''
  @HostBinding('class.hide-scrollbar') hideScrollBar = ''
  @HostBinding('class.grid') gridView = ''

  private currentlyRendered = '[]'
  private hasRunAfterInit = false

  constructor(element: ElementRef, ngZone: NgZone) {
    super(element, ngZone)
  }

  ngOnInit() {
    super.ngOnInit()
    this.dataSource = []
    this.scrollEndThreshold = this.scrollEndThreshold || 100
    this.direction = this.direction || 'VERTICAL'
  }

  ngAfterViewInit() {
    super.ngAfterViewInit()
    if (Array.isArray(this.dataSource) && this.dataSource.length) this.renderDataSource()
    this.runOnScrollEndIfNotScrollable()
    this.hasRunAfterInit = true
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

  getIteratorName() {
    return this.iteratorName || 'item'
  }

  renderDataSource() {
    const element = this.getViewContentManager().getElement()
    const contextId = this.getIteratorName()
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

    this.currentlyRendered = JSON.stringify(this.dataSource)
    this.getViewContentManager().getView().getRenderer().doFullRender(element, element.id)

    /* If the dataSource comes from a context, it might be initially empty, so the closes
    scroll is one, when the data actually comes, the closes scroll may change, so to guarantee
    the scroll will work as expected, we call verifyChangedParent every time the dataSource
    is changed */
    this.verifyChangedParent()
    this.allowOnScrollEnd()
  }

  ngOnChanges() {
    if (!this.hasRunAfterInit || !Array.isArray(this.dataSource)) return
    const dataSourceStr = JSON.stringify(this.dataSource)
    if (dataSourceStr === this.currentlyRendered) return
    this.renderDataSource()
    this.runOnScrollEndIfNotScrollable()
  }
}
