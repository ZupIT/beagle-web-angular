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

import { Component, Input, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core'
import { LoadParams } from '@zup-it/beagle-web'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { BeagleLazyInterface } from '../schemas/lazy'

@Component({
  selector: 'beagle-lazy',
  templateUrl: './beagle-lazy.component.html',
  styleUrls: ['./beagle-lazy.component.less'],
})
export class BeagleLazyComponent extends BeagleComponent implements BeagleLazyInterface,
  AfterViewInit {

  @Input() path: string

  constructor() {
    super()
  }

  ngAfterViewInit() {
    const params: LoadParams = {
      path: this.path,
      shouldShowLoading: false,
    }
    const oldTree = this.getBeagleContext().getElement()

    this.getBeagleContext().append(params).then((item) => {
      const newTree = this.getBeagleContext().getElement()
      if (oldTree && newTree) {
        oldTree.children = newTree.children?.slice(oldTree.children?.length) || []
        this.getBeagleContext().updateWithTree({ sourceTree: oldTree })
      }
    })
  }

}
