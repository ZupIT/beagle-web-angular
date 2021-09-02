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

import { Component, Input, ViewEncapsulation, Injector } from '@angular/core'
import { BaseComponent } from '../../runtime/BaseComponent'
import { BeagleProvider } from '../../runtime/BeagleProvider.service'
import { BeagleTouchableInterface } from '../schemas/touchable'

@Component({
  selector: 'beagle-touchable',
  templateUrl: './beagle-touchable.component.html',
  styleUrls: ['./beagle-touchable.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleTouchableComponent extends BaseComponent 
  implements BeagleTouchableInterface {
  @Input() onPress: () => void
  public isPressed = false

  constructor(injector: Injector) {
    super()

    try {
      const beagleProvider = injector.get(BeagleProvider)
      const beagleService = beagleProvider.getBeagleUIService()
    } catch {}
  }

  handleClick() {
    this.isPressed = false
    if (this.onPress) this.onPress()
  }

  handleMouseDown() {
    this.isPressed = true
  }
}
