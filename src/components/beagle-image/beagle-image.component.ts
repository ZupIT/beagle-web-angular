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
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { BeagleImageInterface, Acessibility, ImageContentMode, ImagePath } from '../schemas/image'

@Component({
  selector: 'beagle-image',
  templateUrl: './beagle-image.component.html',
  styleUrls: ['./beagle-image.component.less'],
})
export class BeagleImageComponent extends BeagleComponent implements BeagleImageInterface, OnInit {
  @Input() path: ImagePath
  @Input() contentMode?: ImageContentMode = 'FIT_CENTER'
  @Input() accessibility?: Acessibility = {
    accessible: true,
    accessibilityLabel: '',
  }
  public imageSource = ''

  ngOnInit() {
    const view = this.getBeagleContext().getView()
    this.imageSource = this.path && this.path._beagleImagePath_ === 'local'
      ? this.path && this.path.url || ''
      : view.getUrlBuilder().build(this.path && this.path.url || '')

    if (!this.contentMode) {
      this.contentMode = 'FIT_CENTER'
    }
  }

}
