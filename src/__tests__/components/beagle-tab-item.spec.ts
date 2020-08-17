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

import { TestBed, async, fakeAsync, ComponentFixture } from '@angular/core/testing'
import { BeagleTabItemComponent } from '../../components/beagle-tab-item/beagle-tab-item.component'
import { TabsService } from '../../components/services/tabs.service'
import { ImagePath, ImagePathMode } from '../../components/schemas/image'
import mockBeagleContext, { setAndCallHandler } from './mocks/test-mocks.spec'

let component: BeagleTabItemComponent
let fixture: ComponentFixture<any>
const imagePathModeMock: ImagePathMode = 'local'
const pathMock: ImagePath = {
  _beagleImagePath_: imagePathModeMock,
  url: 'http://teste.com.br',
}
let tabServiceMock: TabsService

describe('BeagleTabItemComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleTabItemComponent,
      ],
      providers: [
        TabsService,
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(BeagleTabItemComponent)
    tabServiceMock = TestBed.get(TabsService)
    spyOn(tabServiceMock, 'notifySelectedTab').and.callThrough()
    spyOn(tabServiceMock, 'changeSelectedTab').and.callThrough()
    component = fixture.componentInstance
    component.getBeagleContext = () => mockBeagleContext
  }))

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('should retrieve component id call listenTabChanges', () => {
    spyOn(component, 'ngAfterViewInit').and.callThrough()
    spyOn(component, 'listenTabChanges').and.callThrough()
    component.ngAfterViewInit()
    expect(component['id']).toBe('abcd')
    expect(component.listenTabChanges).toHaveBeenCalled()
    expect(tabServiceMock.notifySelectedTab).toHaveBeenCalled()
  })

  it('should call on click Handler', fakeAsync(() => {
    spyOn(component, 'handleClick').and.callThrough()

    setAndCallHandler('div', 'Testing', 'click', fixture)

    expect(component.handleClick).toHaveBeenCalled()
  }))

})
