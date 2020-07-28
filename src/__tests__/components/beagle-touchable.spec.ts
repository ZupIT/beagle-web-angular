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

import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BeagleTouchableComponent } 
  from '../../components/beagle-touchable/beagle-touchable.component'

let component: BeagleTouchableComponent
let fixture: ComponentFixture<BeagleTouchableComponent>

function setAndCallHandler(selector: string, value: string, event: string) {
  fixture.detectChanges()
  tick()

  const input = fixture.debugElement.query(By.css(selector)).nativeElement
  input.value = value
  input.dispatchEvent(new Event(event))
  tick()
}

describe('BeagleTouchableComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleTouchableComponent,
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(BeagleTouchableComponent)
    component = fixture.componentInstance
  }))

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should call handlers and set Inputs', fakeAsync(() => {
    spyOn(component, 'handleClick').and.callThrough()

    setAndCallHandler('div', 'Testing', 'click')

    expect(component.handleClick).toHaveBeenCalled()
  }))

})
