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
import { Properties as CSSProperties } from 'csstype'
import { Component, Input, ViewEncapsulation, AfterViewInit } from '@angular/core'
import { IdentifiableBeagleUIElement } from '@zup-it/beagle-web/types'
import { BeagleButtonInterface } from '../schemas/button'
import { BeagleComponent } from '../../runtime/BeagleComponent'

@Component({
  selector: 'beagle-button',
  templateUrl: './beagle-button.component.html',
  styleUrls: ['./beagle-button.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleButtonComponent extends BeagleComponent
  implements BeagleButtonInterface, AfterViewInit {

  @Input() text: string
  @Input() styleId?: string
  @Input() onPress?: () => void
  @Input() style?: CSSProperties
  usedStyle: Record<string, any>

  public type = 'button'

  constructor() {
    super()
  }

  ngOnInit() {
    this.usedStyle = { ...this.style }
    if (this.usedStyle && this.usedStyle.margin) {
      delete this.usedStyle.margin
    }
  }

  ngAfterViewInit() {
    const element = this.getBeagleContext().getElement()
    this.type = this.isSubmitButton(element)
  }

  handleClick() {
    this.onPress && this.type === 'button' && this.onPress()
  }

  private isSubmitButton(element: IdentifiableBeagleUIElement<any> | null) {
    return element &&
      element.onPress &&
      element.onPress._beagleAction_ === 'beagle:submitForm' ? 'submit' : 'button'
  }

}
