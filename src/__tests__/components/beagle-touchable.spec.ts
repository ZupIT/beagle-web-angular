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

import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing'
import { BeagleTouchableComponent }
  from '../../components/beagle-touchable/beagle-touchable.component'
import { setAndCallHandler } from './mocks/test-mocks.spec'

let component: BeagleTouchableComponent
let fixture: ComponentFixture<BeagleTouchableComponent>

describe('BeagleTouchableComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleTouchableComponent,
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(BeagleTouchableComponent)
    component = fixture.componentInstance
    component.onPress = jest.fn()
    fixture.detectChanges()
  }))

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot()
  })

  it('should call handlers and set Inputs', fakeAsync(() => {
    spyOn(component, 'handleClick').and.callThrough()

    setAndCallHandler('div', 'Testing', 'click', fixture)

    expect(component.onPress).toHaveBeenCalled()
  }))

})
