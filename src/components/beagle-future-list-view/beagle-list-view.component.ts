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
  OnInit,
  OnDestroy,
  HostBinding,
} from '@angular/core'
import { fromEvent, Subscription } from 'rxjs'
import { BeagleUIElement, Tree } from '@zup-it/beagle-web'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { BeagleFutureListViewInterface, Direction } from '../schemas/list-view'

@Component({
  selector: 'beagle-future-list-view',
  templateUrl: './beagle-list-view.component.html',
  styleUrls: ['./beagle-list-view.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleFutureListViewComponent extends BeagleComponent
  implements BeagleFutureListViewInterface,
  AfterViewChecked, OnChanges, AfterViewInit, OnInit, OnDestroy {

  @Input() direction: Direction
  @Input() dataSource: any[]
  @Input() iteratorName?: string
  @Input() template: BeagleUIElement
  @Input() onInit?: () => void
  @Input() onScrollEnd?: () => void
  @Input() scrollEndThreshold?: number
  @Input() useParentScroll?: boolean
  @HostBinding('class') hasScrollClass = ''

  private scrollSubscription: Subscription
  private hasInitialized = false
  private hasRenderedDataSource = false
  private parentNode: HTMLElement
  private allowedOnScrollEnd = true

  constructor(
    private element: ElementRef,
    private ngZone: NgZone) {
    super()
  }

  ngOnInit() {
    this.setDefaultValues()
  }

  ngAfterViewInit() {
    this.setParentNode()
    this.createScrollListener()

    if (this.scrollEndThreshold === 0) this.callOnScrollEnd()
    if (!this.hasRenderedDataSource) this.renderDataSource()
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

  setDefaultValues() {
    if (!this.scrollEndThreshold) this.scrollEndThreshold = 100
    if (!this.direction) this.direction = 'VERTICAL'
    if (this.useParentScroll === undefined) this.useParentScroll = false
    this.hasScrollClass = this.useParentScroll ? '' : 'hasScroll'
  }

  allowedScroll(node: HTMLElement) {
    const overflowY = getComputedStyle(node).overflowY
    const overflowX = getComputedStyle(node).overflowX
    const hasYScroll = overflowY !== 'visible' && overflowY !== 'hidden'
    const hasXScroll = overflowX !== 'visible' && overflowX !== 'hidden'
    return { hasYScroll: hasYScroll, hasXScroll: hasXScroll }
  }

  getParentNode(node: HTMLElement) {
    if (!node) return null
    if (node.nodeName === 'HTML') return node

    const { hasYScroll: hasYScroll, hasXScroll: hasXScroll } = this.allowedScroll(node)

    if ((this.direction === 'VERTICAL' &&
      (node.clientHeight === 0 || node.scrollHeight <= node.clientHeight || !hasYScroll)) ||
      (this.direction === 'HORIZONTAL' &&
        (node.clientWidth === 0 || node.scrollWidth <= node.clientWidth || !hasXScroll))
    ) {
      return this.getParentNode(node.parentNode as HTMLElement)
    }
    return node
  }

  setParentNode() {
    if (this.useParentScroll) {
      this.parentNode = this.getParentNode(this.element.nativeElement.parentNode)
    } else {
      this.parentNode = this.element.nativeElement
    }
  }

  createScrollListener() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe()
    }
    const listenTo = this.parentNode.nodeName === 'HTML' ? window : this.parentNode
    this.scrollSubscription = fromEvent(listenTo, 'scroll').subscribe(
      (event) => this.calcPercentage(),
    )
  }

  calcPercentage() {
    let screenPercentage: number
    if (this.direction === 'VERTICAL') {
      const scrollPosition = this.parentNode.scrollTop
      screenPercentage = (scrollPosition /
        (this.parentNode?.scrollHeight - this.parentNode?.clientHeight)) * 100
    } else {
      const scrollPosition = this.parentNode.scrollLeft
      screenPercentage = (scrollPosition /
        (this.parentNode?.scrollWidth - this.parentNode?.clientWidth)) * 100
    }

    if (this.scrollEndThreshold &&
      Math.ceil(screenPercentage) >= this.scrollEndThreshold &&
      this.allowedOnScrollEnd) {
      this.allowedOnScrollEnd = false
      this.callOnScrollEnd()
    }
  }

  renderDataSource() {
    const element = this.getBeagleContext().getElement()
    if (!element || !Array.isArray(this.dataSource)) return
    const contextId = this.iteratorName || 'item'

    // @ts-ignore: at this point, element.children won't have ids and it's ok.
    element.children = this.dataSource.map((item, index) => {
      const child = Tree.clone(this.template)
      child._implicitContexts_ = [{ id: contextId, value: item }]
      child.id = `${element.id}_${index}`
      return child
    })

    this.getBeagleContext().getView().getRenderer().doFullRender(element, element.id)
    this.hasRenderedDataSource = true

    // If the dataSource comes from a context, it might be initially empty, so the closes
    // scroll is one, when the data actually comes, the closes scroll may change, so to guarantee
    // the scroll will work as expected, we call verifyChangedParent every time the dataSource
    // is changed
    this.verifyChangedParent()
    this.allowedOnScrollEnd = true
  }

  verifyChangedParent() {
    const previousParent = this.parentNode
    this.setParentNode()
    if (previousParent !== this.parentNode) {
      this.createScrollListener()
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['dataSource'] || !this.getBeagleContext) return
    const current = JSON.stringify(changes['dataSource'].currentValue)
    const prev = JSON.stringify(changes['dataSource'].previousValue)
    if (prev !== current) this.renderDataSource()
  }

  verifyCallingOnInit() {
    if (!this.hasInitialized && this.isRendered()) {
      this.hasInitialized = true
      if (this.onInit) {
        this.onInit()
      }
    }
  }

  isRendered() {
    return this.element.nativeElement.isConnected
  }

  callOnScrollEnd() {
    this.onScrollEnd && this.onScrollEnd()
  }

  ngOnDestroy() {
    this.scrollSubscription && this.scrollSubscription.unsubscribe()
  }
}
