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
import { FormsModule } from '@angular/forms'
import { BeagleTextAreaComponent } from '../../components/beagle-text-area/beagle-text-area.component'
import { setAndCallHandler } from './mocks/test-mocks.spec'
import { buildBeagleTestModuleMetadata } from './test-module-builder'

let component: BeagleTextAreaComponent
let fixture: ComponentFixture<BeagleTextAreaComponent>

describe('BeagleTextAreaComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      buildBeagleTestModuleMetadata([BeagleTextAreaComponent], [FormsModule]))
      .compileComponents()
      
    fixture = TestBed.createComponent(BeagleTextAreaComponent)
    component = fixture.componentInstance
    component.value = 'Testing'
    component.label = 'Label Test'
    component.name = 'Label'
    component.onChange = jest.fn()
    component.onFocus = jest.fn()
    component.onBlur = jest.fn()

  }))

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('should call handlers', fakeAsync(() => {
    spyOn(component, 'handleChange').and.callThrough()
    spyOn(component, 'handleFocus').and.callThrough()
    spyOn(component, 'handleBlur').and.callThrough()

    setAndCallHandler('textarea', 'Testing', 'input', fixture)
    setAndCallHandler('textarea', 'Testing', 'focus', fixture)
    setAndCallHandler('textarea', 'Testing', 'blur', fixture)

    expect(component.onChange).toHaveBeenCalled()
    expect(component.onFocus).toHaveBeenCalled()
    expect(component.onBlur).toHaveBeenCalled()
  }))
})
