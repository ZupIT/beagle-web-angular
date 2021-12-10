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
import { EventEmitter, Injectable, Output } from '@angular/core'
import { BeagleNavigator, BeagleView, DefaultWebNavigator, NavigationType, Route } from '@zup-it/beagle-web'
import { BeagleProvider } from './BeagleProvider.service'
import BeagleRuntimeError from './errors'

export interface ViewWidget {
  id: string,
  view: BeagleView,
}

@Injectable()
export class BeagleAngularNavigatorService {
  @Output() public onChange = new EventEmitter<ViewWidget>()
  
  private navigator: BeagleNavigator<ViewWidget>
  private nextViewId = 1
  
  constructor (private beagleProvider: BeagleProvider) {
  }

  public create(): void {
    const beagleService = this.beagleProvider.getBeagleUIService()
    if (!beagleService) {
      throw new BeagleRuntimeError('You need to start the beagle provider before using a remote view.')
    }

    this.navigator = DefaultWebNavigator.create(beagleService, this.widgetBuilder)
    this.navigator.onChange((widget: ViewWidget) => {
      this.onChange.emit(widget)
    })
  }

  private widgetBuilder = (view: BeagleView): ViewWidget => {
    const widget = {
      id: `${this.nextViewId++}`,
      view: view,
    }
    return widget
  }

  pushStack = (route: Route, controllerId?: string) => this.navigator.pushStack(route, controllerId)
  
  popStack = () => this.navigator.popStack()
  
  pushView = (route: Route) => this.navigator.pushView(route)
  
  popView = () => this.navigator.popView()
  
  popToView = (route: string) => this.navigator.popToView(route)
  
  resetStack = (route: Route, controllerId?: string) => 
    this.navigator.resetStack(route, controllerId)
  
  resetApplication = (route: Route, controllerId?: string) => 
    this.navigator.resetApplication(route, controllerId)

  navigate = (type: NavigationType, route?: Route | string, controllerId?: string) => 
    this.navigator.navigate(type, route, controllerId)
  
  isEmpty = () => this.navigator.isEmpty()
  
  getCurrentRoute = () => this.navigator.getCurrentRoute()
}
