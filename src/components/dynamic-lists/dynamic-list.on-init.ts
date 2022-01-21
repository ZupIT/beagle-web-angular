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

import { ElementRef, NgZone, AfterViewChecked } from '@angular/core'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { verifyCallingOnInit } from '../state-management'

export class DynamicListOnInit extends BeagleComponent implements AfterViewChecked {
  element: ElementRef
  ngZone: NgZone
  onInit?: () => void

  constructor(element: ElementRef, ngZone: NgZone) {
    super()
    this.element = element
    this.ngZone = ngZone
  }

  ngAfterViewChecked() {
    const viewContentManager = (this.getViewContentManager && this.getViewContentManager())
    this.onInit ? verifyCallingOnInit(viewContentManager, this.ngZone, this.onInit) : null
  }

}
