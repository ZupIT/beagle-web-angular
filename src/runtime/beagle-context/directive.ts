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

import { Directive, ViewContainerRef, ElementRef, OnInit, Input } from '@angular/core'
import { ViewContentManagerMap } from '@zup-it/beagle-web'
import { contextSelector } from '../../constants'
import { BeagleProvider } from '../BeagleProvider.service'
import { BeagleComponent } from '../BeagleComponent'

@Directive({
  selector: `[${contextSelector}]`,
})
export class BeagleContextDirective implements OnInit {
  @Input() _elementId: string
  @Input() _viewId: string
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
    let component

    // @ts-ignore
    if (ng && typeof (ng.getComponent) === 'function') {
      //IVY provides ng.getComponent function whereas other versions don't
      // @ts-ignore
      component = ng.getComponent(this.elementRef.nativeElement)
    } else {
      
      // @ts-ignore
      component = this.viewContainerRef._data?.componentView?.component
    }
    if (component instanceof BeagleComponent) {
      component.getBeagleContext = () => this.contentManagerMap.get(this._viewId, this._elementId)
    }
  }
}
