/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
import { LoadParams, BeagleView, IdentifiableBeagleUIElement } from '@zup-it/beagle-web'
import { AbstractBeagleProvider } from './AbstractBeagleProvider'
import { BeagleContext } from '@zup-it/beagle-web'
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
    this.view = beagleService.createView()
    this.view.subscribe(this.updateView)
    this.view.addErrorListener((errorListener) => {
      errorListener.forEach((error) => {
        console.error(error)
      })
    })
    BeagleContext.registerView(`${this.viewId}`, this.view)
    this.viewStaticPromise.resolve(this.view)
  }

  getTemplate(componentName: IdentifiableBeagleUIElement<any>['type']): TemplateRef<any> {
    if (!this[componentName]) {
      console.warn(
        `Beagle: the component ${componentName} was not declared in Beagle's configuration.`,
      )
    }
    return this[componentName]
  }

  updateView = (uiTree: IdentifiableBeagleUIElement<any>) => {
    this.ngZone.run(() => {
      this.tree = uiTree
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
