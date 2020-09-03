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

import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing'
import { BeagleLazyComponent } from '../../components/beagle-lazy/beagle-lazy.component'
import { BeagleComponent } from '../../runtime/BeagleComponent'
import mockViewContentManager from './mocks/test-mocks.spec'

let component: BeagleLazyComponent
let beagleComponent: BeagleComponent
let fixture: ComponentFixture<BeagleLazyComponent>


describe('BeagleLazyComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleLazyComponent,
      ],
      providers: [
        BeagleComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(BeagleLazyComponent)
    beagleComponent = TestBed.get(BeagleComponent)
    component = fixture.componentInstance
    component.path = 'http://test.com.br'
    component.getViewContentManager = () => mockViewContentManager
    fixture.detectChanges()
    spyOn(component, 'ngAfterViewInit').and.callThrough()
  }))

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

})
