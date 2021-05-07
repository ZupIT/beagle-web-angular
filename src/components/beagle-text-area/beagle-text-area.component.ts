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

import { Component, Input, OnInit } from '@angular/core'
import { logger } from '@zup-it/beagle-web'
import { TextAreaInterface } from '../schemas/text-area'
import { InputHandler } from '../schemas/input-handler'
import { BaseComponent } from '../../runtime/BaseComponent'

/**
 * @deprecated since version 1.8.0.
 * This component will be removed in a future version.
*/
@Component({
  selector: 'beagle-text-area',
  templateUrl: './beagle-text-area.component.html',
  styleUrls: ['./beagle-text-area.component.less'],
})
export class BeagleTextAreaComponent extends BaseComponent 
  implements TextAreaInterface, OnInit {
  @Input() value?: string
  @Input() label?: string
  @Input() name?: string
  @Input() onChange?: InputHandler
  @Input() onFocus?: InputHandler
  @Input() onBlur?: InputHandler
  @Input() disabled?: boolean
  @Input() readonly?: boolean

  ngOnInit() {
    this.label = this.label || ''
    this.disabled = this.disabled || false
    this.readonly = this.readonly || false
    logger.warn('This component is deprecated since version 1.8.0 and will be removed in a future version.')
  }

  public handleChange(value) {
    this.onChange && this.onChange({ value })
  }

  public handleBlur(event) {
    this.onBlur && this.onBlur({ value: event.target.value })
  }

  public handleFocus(event) {
    this.onFocus && this.onFocus({ value: event.target.value })
  }
}
