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

import { TestBed, async } from '@angular/core/testing'
import { BeagleTextComponent } from '../../components/beagle-text/beagle-text.component'
import { TextAlignment } from '../../components/schemas/text'

describe('BeagleTextComponent', () => {
  let textAlignment: TextAlignment
  let component: BeagleTextComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleTextComponent,
      ],
    }).compileComponents()
    const fixture = TestBed.createComponent(BeagleTextComponent)
    component = fixture.componentInstance
    component.text = 'Teste'
  }))

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should call onInit', () => {
    jest.spyOn(component, 'ngOnInit')
    component.ngOnInit()
    expect(component.ngOnInit).toHaveBeenCalled()
  })

  it('should check all the Inputs', () => {
    expect(component.alignment).toBe(textAlignment || 'INHERIT')
    expect(component.styleId).toBe('')
    expect(typeof (component.text)).toBe('string')
    expect(component.textColor).toBe('inherit')
  })
})
