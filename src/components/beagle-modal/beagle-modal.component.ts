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

import { Component, Input, ViewEncapsulation, AfterViewInit } from '@angular/core'
import { BeagleModalInterface } from '../schemas/modal'
import { BeagleComponent } from '../../runtime/BeagleComponent'

@Component({
  selector: 'beagle-modal',
  templateUrl: './beagle-modal.component.html',
  styleUrls: ['./beagle-modal.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleModalComponent extends BeagleComponent implements BeagleModalInterface {

  @Input() isOpen: boolean
  @Input() onClose: () => void

  constructor() {
    super()
  }

  handleClose() {
    this.onClose && this.onClose()
  }

}
