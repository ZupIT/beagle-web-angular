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
import { ViewContentManager, BeagleView } from '@zup-it/beagle-web'
import { tick, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'


const mockBeagleView: BeagleView = {
  fetch: jest.fn(),
  addErrorListener: jest.fn(),
  destroy: jest.fn(),
  getNavigator: jest.fn(),
  getNetworkOptions: jest.fn(),
  getBeagleService: jest.fn(),
  getRenderer: jest.fn(),
  getTree: jest.fn(),
  subscribe: jest.fn(),
  updateWithFetch: jest.fn(),
  updateWithTree: jest.fn(),
}

const mockViewContentManager: ViewContentManager = {
  getElement: (() => ({ '_beagleComponent_': 'beagle-button', 'id': 'abcd' })),
  getElementId: () => 'abcd',
  getView: (()=> mockBeagleView),
}

export function setAndCallHandler(
  selector: string,
  value: string,
  event: string,
  fixture: ComponentFixture<any>) {

  fixture.detectChanges()
  tick()

  const input = fixture.debugElement.query(By.css(selector)).nativeElement
  input.value = value
  input.dispatchEvent(new Event(event))
  tick()
}

export default mockViewContentManager
