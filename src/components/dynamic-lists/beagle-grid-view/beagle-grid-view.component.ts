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
  HostBinding,
  ElementRef,
  NgZone,
} from '@angular/core'
import { BeagleUIElement, Tree } from '@zup-it/beagle-web'
import { BeagleGridViewInterface } from '../../schemas/dynamic-list'
import { DynamicListComponent } from '../dynamic-list.component'

@Component({
  selector: 'beagle-grid-view',
  templateUrl: './beagle-grid-view.component.html',
})
export class BeagleGridViewComponent extends DynamicListComponent
  implements BeagleGridViewInterface {
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

  constructor(element: ElementRef, ngZone: NgZone) {
    super(element, ngZone)
  }

  ngOnInit() {
    console.log('GridView Component', this)
  }
}
