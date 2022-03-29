/*
  * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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
  Output,
  EventEmitter,
} from '@angular/core'
import {
  BeagleView,
  IdentifiableBeagleUIElement,
  RemoteView,
} from '@zup-it/beagle-web'
import { replaceToUnderline } from '../codegen/utils/formatting'
import { BeagleProvider } from './BeagleProvider.service'
import { BeagleAngularNavigatorService, ViewWidget } from './BeagleAngularNavigatorService.service'
import { createStaticPromise } from './utils/promise'
import BeagleRuntimeError from './errors'
import beagleMapKeysConfig from './utils/beagle-map-keys-config'

export abstract class AbstractBeagleRemoteView implements AfterViewInit, OnDestroy, OnChanges {
  public route: string | RemoteView
  public controllerId?: string

  // class attributes
  public tree: IdentifiableBeagleUIElement<any> | null = null
  public view: BeagleView
  public viewId = ''
  public ngZone: NgZone
  public changeDetector: ChangeDetectorRef
  public viewStaticPromise = createStaticPromise<BeagleView>()

  @Output() onCreateBeagleView: EventEmitter<BeagleView> = new EventEmitter<BeagleView>()

  constructor(
    private beagleProvider: BeagleProvider,
    private navigatorService: BeagleAngularNavigatorService,
    ngZone?: NgZone,
    changeDetector?: ChangeDetectorRef,
  ) {
    if (ngZone) this.ngZone = ngZone
    if (changeDetector) this.changeDetector = changeDetector
    this.navigatorService.onChange.subscribe(this.onNavigatorChange)
  }

  ngAfterViewInit() {
    if (!this.beagleProvider || !this.ngZone || !this.changeDetector) {
      throw new BeagleRuntimeError(`
        "beagleProvider", "ngZone" and "changeDetector" must be set before the AfterViewInit runs. 
        Use the constructor or the component instance to set their values.`,
      )
    }
    this.loadRoute()
  }
  
  async ngOnChanges(changes: SimpleChanges) {
    if (this.view && this.hasAnyChanged(changes, ['route'])) {
      this.loadRoute()
    }
  }

  ngOnDestroy() {
    this.view.destroy()
    this.beagleProvider.getBeagleUIService()!.viewContentManagerMap.unregister(this.viewId)
  }

  private onNavigatorChange = (widget: ViewWidget) => {
    const { id, view } = widget
    this.viewId = id    
    this.view = view
    this.view.onChange(this.updateView)

    const beagleService = this.beagleProvider.getBeagleUIService()!
    beagleService.viewContentManagerMap.register(this.viewId, this.view)

    this.viewStaticPromise.resolve(this.view)
    this.onCreateBeagleView.emit(this.view)

    this.view.getRenderer().doFullRender(this.view.getTree())
  }

  // methods
  getTemplate(componentName: IdentifiableBeagleUIElement<any>['type']): TemplateRef<any> {
    const component = beagleMapKeysConfig.getComponent(componentName)
    const normalizedComponentName = replaceToUnderline(component)
    if (!this[normalizedComponentName]) {
      console.warn(`Beagle: the component ${componentName} was not declared in Beagle's configuration.`)
    }
    return this[normalizedComponentName]
  }

  updateView = (uiTree: IdentifiableBeagleUIElement<any>) => {
    if (!this.changeDetector['destroyed']) {
      this.ngZone.run(() => {
        this.tree = uiTree && Object.keys(uiTree).length > 0 ? uiTree : null
        this.changeDetector.detectChanges()
      })
    }    
  }

  elementIdentity = (index: number, element: IdentifiableBeagleUIElement<any>) => element.id

  getView = () => this.viewStaticPromise.promise

  private loadRoute() {
    if (this.route) {
      const remote: RemoteView = typeof this.route === 'string' ? { url: this.route } : this.route
      this.navigatorService.pushStack(remote, this.viewId)
    }
  }

  private hasAnyChanged(changes: SimpleChanges, properties: string[]) {
    return changes && !!properties.find(property => (
      changes[property] && changes[property].previousValue !== changes[property].currentValue),
    )
  }  
}
