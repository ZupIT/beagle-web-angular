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
import { Properties as CSSProperties } from 'csstype'
import { BeagleButtonComponent } from '../../components/beagle-button/beagle-button.component'
import mockViewContentManager from './mocks/test-mocks.spec'

let component: BeagleButtonComponent
let fixture: ComponentFixture<BeagleButtonComponent>
const mockStyle: CSSProperties = {
  height: '100',
  width: '50',
}


describe('BeagleButtonComponent', () => {
  beforeEach(async(() => {
    jest.autoMockOn()
    TestBed.configureTestingModule({
      declarations: [
        BeagleButtonComponent,
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(BeagleButtonComponent)
    component = fixture.componentInstance
    component.getViewContentManager = () => mockViewContentManager
    fixture.detectChanges()
  }))

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot()
  })

  it('should keep styles', () => {
    spyOn(component, 'ngOnInit').and.callThrough()
    component.style = mockStyle
    component.ngOnInit()
    expect(component.usefulStyle).toEqual(mockStyle)
  })

  it('should keep original styles and remove margin style', () => {
    spyOn(component, 'ngOnInit').and.callThrough()
    component.style = mockStyle
    component.ngOnInit()
    component.style = { ...mockStyle, margin: '10px' }
    expect(component.usefulStyle).toEqual(mockStyle)
  })

  it('should trigger handleClick function', () => {
    component.onPress = () => null
    fixture.detectChanges();
    spyOn(component, 'onPress');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click()
    expect(component.onPress).toHaveBeenCalled();
  })
})
