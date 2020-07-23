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
    Component, Input, OnInit,
} from '@angular/core'
import { PageIndicatorInterface } from '../schemas/page-indicator'

@Component({
    selector: 'beagle-page-indicator',
    templateUrl: './beagle-page-indicator.component.html',
    styleUrls: ['./beagle-page-indicator.component.less'],
})
export class BeaglePageIndicatorComponent implements PageIndicatorInterface, OnInit {

    @Input() selectedColor?: string
    @Input() unselectedColor?: string
    @Input() numberOfPages?: number
    @Input() currentPage?: number

    totalPages: number[] = []

    ngOnInit() {
        this.currentPage = this.currentPage || 0
        if (this.numberOfPages) this.totalPages = Array(this.numberOfPages)
    }
}
