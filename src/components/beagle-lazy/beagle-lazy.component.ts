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

import { Component, Input, AfterViewInit } from '@angular/core'
import { BeagleChildren, BeagleUIElement } from '@zup-it/beagle-web'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import { BeagleLazyInterface } from '../schemas/lazy'

@BeagleChildren({ property: 'initialState' })
@Component({
  selector: 'beagle-lazy',
  templateUrl: './beagle-lazy.component.html',
})
export class BeagleLazyComponent extends BeagleComponent implements BeagleLazyInterface,
  AfterViewInit {

  @Input() path: string

  constructor() {
    super()
  }

  private replaceChildren(tree: BeagleUIElement) {
    const beagleView = this.getViewContentManager().getView()
    const anchor = this.getViewContentManager().getElementId()
    beagleView.getRenderer().doFullRender(tree, anchor, 'replace')
  }

  private fetchLazyView() {
    /* here we are going to use the viewClient instead of making the request ourselves to take 
    advantage of the cache system provided by Beagle */
    const beagleView = this.getViewContentManager().getView()
    const { urlBuilder, viewClient } = beagleView.getBeagleService()
    const url = urlBuilder.build(this.path)
    viewClient.load({
      url,
      onChangeTree: tree => this.replaceChildren(tree),
      retry: this.fetchLazyView,
      shouldShowLoading: false,
    })
  }

  ngAfterViewInit() {
    this.fetchLazyView()
  }
}
