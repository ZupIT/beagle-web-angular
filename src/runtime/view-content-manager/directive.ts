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

import { Directive, ViewContainerRef, ElementRef, OnInit, Input, Component } from '@angular/core'
import { logger, ViewContentManagerMap } from '@zup-it/beagle-web'
import { createBeagleContextFromViewContentManager } from '@zup-it/beagle-web/legacy/beagle-context'
import { viewContentManagerSelector } from '../../constants'
import { BeagleProvider } from '../BeagleProvider.service'
import { BeagleComponent } from '../BeagleComponent'

@Directive({
  selector: `[${viewContentManagerSelector}]`,
})
export class ViewContentManager implements OnInit {
  @Input() _elementId: string
  @Input() _viewId: string
  @Input() selfReference: any
  private contentManagerMap: ViewContentManagerMap

  constructor(
    public viewContainerRef: ViewContainerRef,
    public elementRef: ElementRef,
    beagleProvider: BeagleProvider,
  ) {
    const beagleService = beagleProvider.getBeagleUIService()
    if (!beagleService) throw new Error('Beagle: no instance for the BeagleService has been found!')
    this.contentManagerMap = beagleService.viewContentManagerMap
  }


  ngOnInit() {
    const component = this.selfReference

    if (component instanceof BeagleComponent) {
      component.getViewContentManager = () => (
        this.contentManagerMap.get(this._viewId, this._elementId)
      )
      // todo: legacy code. Remove with v2.0.
      component.getBeagleContext = () => {
        logger.warn('"getBeagleContext" has been deprecated. Consider using "getViewContentManager" instead.')
        const contentManager = this.contentManagerMap.get(this._viewId, this._elementId)
        return createBeagleContextFromViewContentManager(contentManager)
      }
    }
  }
}
