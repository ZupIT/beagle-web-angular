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
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { BeagleInputComponent } from '../../components/beagle-input/beagle-input.component'


let component: BeagleInputComponent
let fixture: ComponentFixture<BeagleInputComponent>


function setAndCallHandler(selector: string, value: string, event: string) {
  fixture.detectChanges()
  tick()

  const input = fixture.debugElement.query(By.all()).nativeElement
  input.value = value
  input.dispatchEvent(new Event(event))
  tick()
}

describe('BeagleImageComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        BeagleInputComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(BeagleInputComponent)
    component = fixture.componentInstance
    component.onFocus = jest.fn()
    component.onChange = jest.fn()
    component.onBlur = jest.fn()

  }))

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('should call handlers and set Inputs', fakeAsync(() => {
    spyOn(component, 'handleChange').and.callThrough()
    spyOn(component, 'handleFocus').and.callThrough()
    spyOn(component, 'handleBlur').and.callThrough()

    setAndCallHandler('input', 'Testing', 'input')
    setAndCallHandler('input', 'Testing', 'focus')
    setAndCallHandler('input', 'Testing', 'blur')

    expect(component.onChange).toHaveBeenCalled()
    expect(component.onFocus).toHaveBeenCalled()
    expect(component.onBlur).toHaveBeenCalled()
  }))



})
