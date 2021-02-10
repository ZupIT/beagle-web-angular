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

import { Component, Input, ViewEncapsulation, ElementRef, OnInit, OnDestroy } from '@angular/core'
import { BeagleBaseComponent } from '../../runtime/BeagleComponent'
import { BeagleModalInterface } from '../schemas/modal'

@Component({
  selector: 'beagle-modal',
  templateUrl: './beagle-modal.component.html',
  styleUrls: ['./beagle-modal.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleModalComponent extends BeagleBaseComponent 
  implements BeagleModalInterface, OnInit, OnDestroy {
  @Input() isOpen: boolean
  @Input() onClose: () => void

  constructor(private elementRef: ElementRef) {
    super()
  }

  ngOnInit() {
    document.addEventListener('keyup', (event) => this.closeOnEsc(event))
    this.elementRef.nativeElement.addEventListener('click', el => this.closeOnClick(el))
  }

  ngOnDestroy() {
    document.removeEventListener('keyup', (event) => this.closeOnEsc(event))
    this.elementRef.nativeElement.removeEventListener('click', el => this.closeOnClick(el))
  }

  handleClose() {
    this.onClose && this.onClose()
  }

  closeOnEsc({ key }: KeyboardEvent) {
    if (key === 'Escape') {
      this.handleClose()
      document.removeEventListener('keyup', this.handleClose)
    }
  }

  closeOnClick({ target }) {
    if (target.className === 'modal-background') {
      this.handleClose()
    }
  }
}
