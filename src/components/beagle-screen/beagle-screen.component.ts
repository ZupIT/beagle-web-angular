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
  ViewEncapsulation,
  Input,
  OnDestroy,
  Injector,
  OnInit,
} from '@angular/core'
import { ScreenEvent, Analytics } from '@zup-it/beagle-web'
import { BeagleProvider } from '../../runtime/BeagleProvider.service'
import { BeagleScreenInterface } from '../schemas/screen'

@Component({
  selector: 'beagle-screen',
  templateUrl: './beagle-screen.component.html',
  styleUrls: ['./beagle-screen.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleScreenComponent implements BeagleScreenInterface, OnDestroy, OnInit {
  @Input() screenAnalyticsEvent: ScreenEvent
  hasInitialized = false
  private beagleAnalytics: Analytics | undefined

  constructor(injector: Injector) {
    try {
      const beagleProvider = injector.get(BeagleProvider)
      const beagleService = beagleProvider.getBeagleUIService()
      this.beagleAnalytics = beagleService && beagleService.analytics
    } catch {}
  }

  ngOnInit() {
    if (this.screenAnalyticsEvent && this.beagleAnalytics) {
      this.beagleAnalytics.trackEventOnScreenAppeared(this.screenAnalyticsEvent)
    }
  }

  ngOnDestroy() {
    if (this.screenAnalyticsEvent && this.beagleAnalytics) {
      this.beagleAnalytics.trackEventOnScreenDisappeared(this.screenAnalyticsEvent)
    }
  }
}
