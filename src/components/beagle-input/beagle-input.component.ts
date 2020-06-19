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

import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { BeagleInputInterface, InputType } from '../schemas/input'

@Component({
  selector: 'beagle-input',
  templateUrl: './beagle-input.component.html',
  styleUrls: ['./beagle-input.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleInputComponent implements BeagleInputInterface, OnInit {

  @Input() value?: string
  @Input() placeholder?: string
  @Input() disabled?: boolean
  @Input() readOnly?: boolean
  @Input() type?: InputType
  @Input() hidden?: boolean
  @Input() onChange?: () => void
  @Input() onBlur?: () => void
  @Input() onFocus?: () => void

  ngOnInit() {
    this.value = this.value || ''
    this.placeholder = this.placeholder || ''
    this.disabled = this.disabled || false
    this.readOnly = this.readOnly || false
    this.type = this.type || 'TEXT'
    this.hidden = this.hidden || false
  }

  public handleChange() {
    this.onChange && this.onChange()
  }

  public handleBlur() {
    this.onBlur && this.onBlur()
  }

  public handleFocus() {
    this.onFocus && this.onFocus()
  }
}
