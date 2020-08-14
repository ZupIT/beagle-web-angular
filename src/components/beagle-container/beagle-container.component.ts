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
  Component, ViewEncapsulation, AfterViewChecked,
  Input, ElementRef, NgZone, OnDestroy, Injector,
} from '@angular/core'
import { ScreenEvent, Analytics } from '@zup-it/beagle-web'
import { BeagleProvider } from '../../runtime/BeagleProvider.service'
import { BeagleContainerInterface } from '../schemas/container'

@Component({
  selector: 'beagle-container',
  templateUrl: './beagle-container.component.html',
  styleUrls: ['./beagle-container.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleContainerComponent implements BeagleContainerInterface,
  AfterViewChecked, OnDestroy {

  @Input() onInit?: () => void
  @Input() screenAnalyticsEvent: ScreenEvent
  hasInitialized = false
  private beagleAnalytics: Analytics | undefined

  constructor(private element: ElementRef, private ngZone: NgZone, injector: Injector) {
    try {
      const beagleProvider = injector.get(BeagleProvider)
      const beagleService = beagleProvider.getBeagleUIService()
      this.beagleAnalytics = beagleService && beagleService.analytics
    } catch {}
  }

  ngAfterViewChecked() {
  
    if (!this.hasInitialized && (this.onInit || this.screenAnalyticsEvent)) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          if (!this.hasInitialized && this.isRendered()) {
            if (this.screenAnalyticsEvent && this.beagleAnalytics) {
              this.beagleAnalytics.trackEventOnScreenAppeared(this.screenAnalyticsEvent)
            }
            this.hasInitialized = true
            this.onInit && this.onInit()
          }
        }, 5)
      })
    }
  }

  isRendered() {
    return this.element.nativeElement.isConnected
  }

  ngOnDestroy() {
    if (this.screenAnalyticsEvent && this.beagleAnalytics) {
      this.beagleAnalytics.trackEventOnScreenDisappeared(this.screenAnalyticsEvent)
    }
  }
}
