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

import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { BeagleTextComponent } from '../../components/beagle-text/beagle-text.component'
import { buildBeagleTestModuleMetadata } from './test-module-builder'

describe('BeagleTextComponent', () => {
  let component: BeagleTextComponent
  let fixture: ComponentFixture<BeagleTextComponent>

  const initialText = 'Test'

  beforeEach(async(() => {
    TestBed.configureTestingModule(buildBeagleTestModuleMetadata([BeagleTextComponent]))
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BeagleTextComponent)
    component = fixture.componentInstance    
  })

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('should render the string as initialized', () => {
    component.text = initialText
    fixture.detectChanges()

    const p = fixture.debugElement.nativeElement.querySelector('p')
    expect(p?.innerHTML).toBe(initialText)
  })

  it('should not render any text when text is null', () => {
    const p = fixture.debugElement.nativeElement.querySelector('p')

    component.text = null
    fixture.detectChanges()
    expect(p?.innerHTML.length).toBe(0)
  })

  it('should not render any text when text is undefined', () => {
    const p = fixture.debugElement.nativeElement.querySelector('p')

    component.text = undefined
    fixture.detectChanges()
    expect(p?.innerHTML.length).toBe(0)
  })

  it('should render numbers as strings', () => {
    const p = fixture.debugElement.nativeElement.querySelector('p')
    const value = 123.45

    component.text = value
    fixture.detectChanges()
    expect(p?.innerHTML).toBe(String(value))
  })

  it('should render an object as stringfied json object', () => {
    const p = fixture.debugElement.nativeElement.querySelector('p')
    const obj = { my: 'test' }

    component.text = obj
    fixture.detectChanges()
    expect(p?.innerHTML).toBe(JSON.stringify(obj))
  })

  it('should render an array as stringfied json array', () => {
    const p = fixture.debugElement.nativeElement.querySelector('p')
    const arr = [{ my: 'test' }, 'test', 123.45]

    component.text = arr
    fixture.detectChanges()
    expect(p?.innerHTML).toBe(JSON.stringify(arr))
  })

  it('should render a function as empty string', () => {
    const p = fixture.debugElement.nativeElement.querySelector('p')

    component.text = function test() { return true }
    fixture.detectChanges()
    expect(p?.innerHTML).toBe('')
  })
})
