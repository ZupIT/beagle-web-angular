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
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  NgZone,
  TemplateRef,
} from '@angular/core'
import {
  LoadParams,
  BeagleView,
  IdentifiableBeagleUIElement,
  replaceBindings,
  EventHandler,
  createEventHandler,
} from '@zup-it/beagle-web'
import { BeagleContext } from '@zup-it/beagle-web'
import { twoPointsToUnderline } from '../codegen/utils/formatting'
import { AbstractBeagleProvider } from './AbstractBeagleProvider'
import { createStaticPromise } from './utils/promise'
import BeagleRuntimeError from './errors'

let nextViewId = 1

export abstract class AbstractBeagleRemoteView implements AfterViewInit, OnDestroy, OnChanges {
  loadParams: LoadParams = { path: '' }
  tree: IdentifiableBeagleUIElement<any>
  view: BeagleView
  viewId = `${nextViewId++}`
  beagleProvider: AbstractBeagleProvider
  ngZone: NgZone
  changeDetector: ChangeDetectorRef
  viewStaticPromise = createStaticPromise<BeagleView>()
  eventHandler: EventHandler

  constructor(
    beagleProvider?: AbstractBeagleProvider,
    ngZone?: NgZone,
    changeDetector?: ChangeDetectorRef,
  ) {
    if (beagleProvider) this.beagleProvider = beagleProvider
    if (ngZone) this.ngZone = ngZone
    if (changeDetector) this.changeDetector = changeDetector
  }

  createBeagleView() {
    const beagleService = this.beagleProvider.getBeagleUIService()
    if (!beagleService) {
      throw new BeagleRuntimeError(
        'you need to start the beagle provider before using a remote view.',
      )
    }
    this.view = beagleService.createView(this.loadParams.path)
    this.view.subscribe(this.updateView)
    this.view.addErrorListener((errorListener) => {
      errorListener.forEach((error) => {
        console.error(error)
      })
    })
    BeagleContext.registerView(`${this.viewId}`, this.view)
    this.viewStaticPromise.resolve(this.view)
  }

  createEventHandler() {
    const beagleService = this.beagleProvider.getBeagleUIService()
    if (!beagleService) return
    this.eventHandler = createEventHandler(beagleService.getConfig().customActions, this.view)
  }

  getTemplate(componentName: IdentifiableBeagleUIElement<any>['type']): TemplateRef<any> {
    if (!this[twoPointsToUnderline(componentName)]) {
      console.warn(
        `Beagle: the component ${componentName} was not declared in Beagle's configuration.`,
      )
    }
    return this[twoPointsToUnderline(componentName)]
  }

  updateView = (uiTree: IdentifiableBeagleUIElement<any>) => {
    this.ngZone.run(() => {
      const uiTreeWithActions = this.eventHandler.interpretEventsInTree(uiTree)
      const uiTreeWithValues = replaceBindings(uiTreeWithActions)
      this.tree = uiTreeWithValues
      this.changeDetector.detectChanges()
    })
  }

  elementIdentity(index: number, element: IdentifiableBeagleUIElement<any>) {
    return element.id
  }

  getView() {
    return this.viewStaticPromise.promise
  }

  ngAfterViewInit() {
    if (!this.beagleProvider || !this.ngZone || !this.changeDetector) {
      throw new BeagleRuntimeError(
        '"beagleProvider", "ngZone" and "changeDetector" must be set before the AfterViewInit runs. Use the constructor or the component instance to set their values.',
      )
    }
    this.createBeagleView()
    this.createEventHandler()
    this.view.updateWithFetch(this.loadParams)
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.loadParams) {
      if (
        changes.loadParams.previousValue
        && changes.loadParams.previousValue !== changes.loadParams.currentValue
      ) {
        this.view.updateWithFetch(this.loadParams)
      }
    }
  }

  ngOnDestroy() {
    BeagleContext.unregisterView(this.viewId)
  }
}
