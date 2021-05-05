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
import { AfterViewInit, Component, Input, ViewEncapsulation } from '@angular/core'
import { ClickEvent, IdentifiableBeagleUIElement } from '@zup-it/beagle-web'
import { Properties as CSSProperties } from 'csstype'

import { BeagleComponent } from '../../runtime/BeagleComponent'
import { BeagleButtonInterface, StylesNotToInherit } from '../schemas/button'

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
  @Input() clickAnalyticsEvent?: ClickEvent
  @Input() enabled?: boolean
  public usefulStyle: Record<string, any> = {}
  public type = 'button'
  public disabled: boolean

  ngOnInit() {
    if (this.style) {
      this.usefulStyle = Object.keys(this.style).reduce((styleObject, prop) => {
        if (!StylesNotToInherit.includes(prop)) {
          styleObject[prop] = this.style && this.style[prop]
        }
        return styleObject
      }, {})
    }
  }

  ngOnChanges() {
    this.disabled = this.enabled === undefined ? false : !this.enabled
  }

  ngAfterViewInit() {
    if (this.getViewContentManager instanceof Function) {
      const element = this.getViewContentManager().getElement()
      this.type = this.isSubmitButton(element)
    }
  }

  handleClick() {
    this.onPress && this.type === 'button' && this.onPress()

    if (this.getViewContentManager instanceof Function) {
        const beagleService = this.getViewContentManager().getView().getBeagleService()
        const analytics = beagleService ? beagleService.analytics : null

        if (this.clickAnalyticsEvent && analytics) {
          analytics.trackEventOnClick(this.clickAnalyticsEvent)
        }
    }    
  }

  private isSubmitButton(element: IdentifiableBeagleUIElement<any> | null) {
    return element &&
      element.onPress &&
      element.onPress._beagleAction_ === 'beagle:submitForm' ? 'submit' : 'button'
  }
}
