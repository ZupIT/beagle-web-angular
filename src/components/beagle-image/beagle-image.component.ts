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

import { Component, Input, OnChanges, Injector, SimpleChanges } from '@angular/core'
import { URLBuilder } from '@zup-it/beagle-web'
import { BeagleProvider } from '../../runtime/BeagleProvider.service'
import { BeagleImageInterface, Accessibility, ImageMode, ImagePath } from '../schemas/image'

@Component({
  selector: 'beagle-image',
  templateUrl: './beagle-image.component.html',
  styleUrls: ['./beagle-image.component.less'],
})
export class BeagleImageComponent implements BeagleImageInterface, OnChanges {
  @Input() path: ImagePath
  @Input() mode?: ImageMode = 'FIT_CENTER'
  @Input() accessibility?: Accessibility = {
    accessible: true,
    accessibilityLabel: '',
  }
  public imageSource = ''
  private urlBuilder: URLBuilder | undefined

  constructor(injector: Injector) {
    try {
      const beagleProvider = injector.get(BeagleProvider)
      const beagleService = beagleProvider.getBeagleUIService()
      this.urlBuilder = beagleService && beagleService.urlBuilder
    } catch { }
  }

  ngOnChanges() {
    this.imageSource = (this.path && this.path._beagleImagePath_ === 'local') || !this.urlBuilder
      ? this.path && this.path.url || ''
      : this.urlBuilder.build(this.path && this.path.url || '')

    if (!this.mode) {
      this.mode = 'FIT_CENTER'
    }
  }
}
