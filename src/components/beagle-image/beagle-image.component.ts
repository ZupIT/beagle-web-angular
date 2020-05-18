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
import { BeagleImageConfig } from '../../runtime/BeagleImageConfig'
import { ImageContentMode } from '../types'

@Component({
  selector: 'beagle-image',
  templateUrl: './beagle-image.component.html',
  styleUrls: ['./beagle-image.component.less'],
})
export class BeagleImageComponent implements OnInit {

  @Input() name = ''
  @Input() path = ''
  @Input() contentMode?: ImageContentMode = 'FIT_CENTER'
  imageName = ''

  ngOnInit() {
    this.imageName = this.name ? 
      BeagleImageConfig.imagesLocation + this.name : this.path

    if (!this.contentMode) {
      this.contentMode = 'FIT_CENTER'
    }
  }

}
