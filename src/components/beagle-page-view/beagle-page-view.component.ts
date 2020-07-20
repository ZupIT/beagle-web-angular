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
  Component, ViewEncapsulation,
  Input, ViewChild,
  Renderer2,
  SimpleChanges,
  OnInit,
} from '@angular/core'
import { BeaglePageViewInterface } from '../schemas/page-view'
import { PageIndicatorInterface } from '../schemas/page-indicator'

@Component({
  selector: 'beagle-page-view',
  templateUrl: './beagle-page-view.component.html',
  styleUrls: ['./beagle-page-view.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeaglePageViewComponent implements BeaglePageViewInterface, OnInit {

  @Input() pageIndicator?: PageIndicatorInterface
  @Input() onPageChange?: (index: number) => void
  @Input() currentPage?: number
  @ViewChild('contentItems') contentItems
  totalPages: number[] = []

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.currentPage = this.currentPage || 0
  }

  ngAfterViewInit() {
    if (this.contentItems && this.contentItems.nativeElement) {
      const elements: Element[] = Array.from(this.contentItems.nativeElement.children)
      this.totalPages = elements.map((item, index) => {
        this.renderer.addClass(item, 'page-item')
        return index
      })
      this.changeActualPage(this.currentPage)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['currentPage']) return
    const current = changes['currentPage'].currentValue
    const prev = changes['currentPage'].previousValue
    if (prev !== current) this.changeActualPage(this.currentPage)
  }

  changeSlide(index: number) {
    if (this.onPageChange) this.onPageChange(index)
    else this.changeActualPage(index)
  }

  changeActualPage(index) {
    if (this.contentItems && this.contentItems.nativeElement) {
      const elements: Element[] = Array.from(this.contentItems.nativeElement.children)
      elements.forEach((element, pos) => {
        if (pos === index) {
          this.renderer.addClass(element, 'active')
          this.currentPage = index
        } else {
          this.renderer.removeClass(element, 'active')
        }
      })
    }
  }

  backSlide() {
    if (this.currentPage !== undefined && this.currentPage > 0) {
      this.changeSlide(this.currentPage - 1)
    }
  }

  nextSlide() {
    if (this.currentPage !== undefined && this.currentPage < this.totalPages.length - 1) {
      this.changeSlide(this.currentPage + 1)
    }
  }
}
