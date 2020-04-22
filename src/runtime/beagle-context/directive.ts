/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { Directive, ViewContainerRef, ElementRef, OnInit, Input } from '@angular/core'
import { BeagleContext } from '@zup-it/beagle-web'
import { contextSelector } from '../../constants'
import { BeagleComponent } from '../BeagleComponent'

@Directive({
  selector: `[${contextSelector}]`,
})
export class BeagleContextDirective implements OnInit {
  @Input() _elementId: string
  @Input() _viewId: string

  constructor(public viewContainerRef: ViewContainerRef, public elementRef: ElementRef) { }

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
      component.getBeagleContext = () => BeagleContext.getContext(this._viewId, this._elementId)
    }
  }
}
