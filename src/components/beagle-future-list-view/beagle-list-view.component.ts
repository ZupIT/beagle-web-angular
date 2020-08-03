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
} from '@angular/core'
import { fromEvent, Subscriber, Subscription } from 'rxjs'
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
  implements BeagleFutureListViewInterface,
  AfterViewChecked, OnChanges, AfterViewInit, OnInit, OnDestroy {

  @Input() direction: Direction
  @Input() dataSource: any[]
  @Input() template: BeagleUIElement
  @Input() onInit?: () => void
  @Input() onScrollEnd?: () => void
  @Input() scrollEndThreshold?: number
  
  private scrollSubscription: Subscription
  private hasInitialized = false
  private hasRenderedDataSource = false
  private hasSize = false

  constructor(
    private element: ElementRef,
    private ngZone: NgZone) {
    super()
  }

  ngOnInit() {
    this.setDefaultValues()
    if (this.element.nativeElement.parentNode.style) {
      const sizeProperty = this.direction === 'VERTICAL' ? 'height' : 'width'
      this.hasSize = this.element.nativeElement.parentNode.style[sizeProperty] !== ''
    }
    this.createScrollListener()
  }

  ngAfterViewInit() {
    if (!this.hasRenderedDataSource) this.renderDataSource()
    if (this.scrollEndThreshold === 0) this.callOnScrollEnd()
    else this.verifyNoScroll()
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
    if (!this.scrollEndThreshold) {
      this.scrollEndThreshold = 100
    }
    if (!this.direction) {
      this.direction = 'VERTICAL'
    }
  }

  createScrollListener() {
    let parentNode: HTMLElement
    let listenTo

    if (this.hasSize) {
      parentNode = this.element.nativeElement.parentNode
      listenTo = parentNode
    } else {
      parentNode = document.body.parentNode as HTMLElement
      listenTo = window
    }

    this.scrollSubscription = fromEvent(listenTo, 'scroll').subscribe(
      (event) => this.calcPercentage(parentNode))
  }

  calcPercentage(parentNode: HTMLElement) {
    let screenPercentage
    if (this.direction === 'VERTICAL') {
      const scrollPosition = parentNode.scrollTop
      screenPercentage = (scrollPosition /
        (parentNode?.scrollHeight - parentNode?.clientHeight)) * 100
    } else {
      const scrollPosition = parentNode.scrollLeft
      screenPercentage = (scrollPosition /
        (parentNode?.scrollWidth - parentNode?.clientWidth)) * 100
    }
    if (this.scrollEndThreshold && screenPercentage >= this.scrollEndThreshold) {
      this.callOnScrollEnd()
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

  verifyNoScroll() {
    const element = this.element.nativeElement
    //Content is smaller than the visible screen height, so there is no scroll.
    //Therefore, we call the callOnScrollEnd function.
    if ((this.direction === 'VERTICAL' && element.scrollHeight >= element.clientHeight) ||
      (this.direction === 'HORIZONTAL' && element.scrollWidth >= element.clientWidth)) {
      this.callOnScrollEnd()
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
      if (this.onInit) this.onInit()
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
