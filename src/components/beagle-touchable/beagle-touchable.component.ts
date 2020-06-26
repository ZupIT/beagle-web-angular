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

import { Component, Input, ViewEncapsulation } from '@angular/core'
import { ClickEvent } from '@zup-it/beagle-web/types'
import { BeagleAnalytics } from '@zup-it/beagle-web'
import { BeagleTouchableInterface } from '../schemas/touchable'

@Component({
  selector: 'beagle-touchable',
  templateUrl: './beagle-touchable.component.html',
  styleUrls: ['./beagle-touchable.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleTouchableComponent implements BeagleTouchableInterface {
  @Input() onPress: () => void
  @Input() clickAnalyticsEvent?: ClickEvent
  beagleAnalytics = BeagleAnalytics.getAnalytics()

  handleClick() {
    if (this.clickAnalyticsEvent && this.beagleAnalytics) {
      this.beagleAnalytics.trackEventOnClick(this.clickAnalyticsEvent)
    }
    if (this.onPress) this.onPress()
  }
}
