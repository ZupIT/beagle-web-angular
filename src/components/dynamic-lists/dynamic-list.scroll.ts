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
  ElementRef,
  NgZone,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core'
import { fromEvent, Subscription } from 'rxjs'
import { ListDirection } from '../schemas/dynamic-list'
import { DynamicListOnInit } from './dynamic-list.on-init'

export class DynamicListScroll
  extends DynamicListOnInit
  implements AfterViewInit, OnInit, OnDestroy {
  direction: ListDirection
  dataSource: any[]
  onScrollEnd?: () => void
  scrollEndThreshold?: number
  useParentScroll?: boolean
  hasScrollClass = true
  isScrollIndicatorVisible?: boolean
  hideScrollBar = false

  private scrollSubscription: Subscription
  private parentNode: HTMLElement
  private allowedOnScrollEnd = true

  constructor(element: ElementRef, ngZone: NgZone) {
    super(element, ngZone)
  }

  ngOnInit() {
    this.hasScrollClass = !this.useParentScroll
    this.hideScrollBar = this.isScrollIndicatorVisible === false 
  }

  ngAfterViewInit() {
    this.setParentNode()
    this.createScrollListener()
    if (this.scrollEndThreshold === 0) this.callOnScrollEnd()
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

  canScrollContent(element: HTMLElement) {
    return (
      this.direction === 'HORIZONTAL'
        ? element.scrollWidth > element.clientWidth
        : element.scrollHeight > element.clientHeight
    )
  }

  getNodeToListenTo() {
    return this.parentNode.nodeName === 'HTML' ? window : this.parentNode
  }

  createScrollListener() {
    if (this.scrollSubscription) this.scrollSubscription.unsubscribe()
    const listenTo = this.getNodeToListenTo()
    this.scrollSubscription = fromEvent(listenTo, 'scroll').subscribe(() => this.calcPercentage())
  }

  runOnScrollEndIfNotScrollable() {
    if (!this.canScrollContent(this.parentNode)) {
      this.callOnScrollEnd()
    }
  }

  calcPercentage() {
    let screenPercentage: number
    if (this.direction === 'VERTICAL') {
      const scrollPosition = this.parentNode.scrollTop
      const diff = this.parentNode?.scrollHeight - this.parentNode?.clientHeight
      screenPercentage = (scrollPosition / diff) * 100
    } else {
      const scrollPosition = this.parentNode.scrollLeft
      const diff = this.parentNode?.scrollWidth - this.parentNode?.clientWidth
      screenPercentage = (scrollPosition / diff) * 100
    }

    const isOverThreshold = (
      this.scrollEndThreshold
      && Math.ceil(screenPercentage) >= this.scrollEndThreshold
    )
    if (isOverThreshold) this.callOnScrollEnd()
  }

  verifyChangedParent() {
    const previousParent = this.parentNode
    this.setParentNode()
    if (previousParent !== this.parentNode) {
      this.createScrollListener()
    }
  }

  callOnScrollEnd() {
    if (this.allowedOnScrollEnd && this.onScrollEnd) {
      this.onScrollEnd()
    }
    this.allowedOnScrollEnd = false

  }

  allowOnScrollEnd() {
    this.allowedOnScrollEnd = true
  }

  ngOnDestroy() {
    this.scrollSubscription && this.scrollSubscription.unsubscribe()
  }
}
