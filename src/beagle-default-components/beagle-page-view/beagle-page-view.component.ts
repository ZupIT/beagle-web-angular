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
    Input, OnInit, ViewChild,
    Renderer2,
} from '@angular/core'
import { PageIndicator } from '../../types'

@Component({
    selector: 'beagle-page-view',
    templateUrl: './beagle-page-view.component.html',
    styleUrls: ['./beagle-page-view.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class BeaglePageViewComponent implements OnInit {
    @Input() pageIndicator: PageIndicator
    @ViewChild('contentItens') contentItens;
    totalPages: number[] = []
    selected = 0

    constructor(private renderer: Renderer2) {
    }

    ngOnInit() {
        this.addLink()
    }

    ngAfterViewInit() {
        if (this.contentItens) {
            const elements: Element[] = Array.from(this.contentItens.nativeElement.children)
            this.totalPages = elements.map((item, index) => {
                this.renderer.addClass(item, 'page-item')
                return index
            })
            this.changeSlide(0)
        }
    }

    changeSlide(index: number) {
        const elements: Element[] = Array.from(this.contentItens.nativeElement.children)
        elements.forEach((element, pos) => {
            if (pos === index) {
                this.renderer.addClass(element, 'active')
                this.selected = index
            } else {
                this.renderer.removeClass(element, 'active')
            }
        })
    }

    addLink() {
        const head = document.getElementsByTagName('head')
        if (head && head[0]) {
            const link: HTMLLinkElement = document.createElement('link')
            link.setAttribute('rel', 'stylesheet')
            link.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons')
            head[0].appendChild(link)
        }
    }
}
