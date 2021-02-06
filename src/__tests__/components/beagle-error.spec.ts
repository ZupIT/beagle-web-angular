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

import { DebugElement } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { BeagleErrorComponent } from '../../components/beagle-error/beagle-error.component'
import { BeagleButtonComponent } from '../../components/beagle-button/beagle-button.component'
import { BeagleTextComponent } from '../../components/beagle-text/beagle-text.component'

let component: BeagleErrorComponent
let fixture: ComponentFixture<BeagleErrorComponent>
let compiledNative: HTMLElement
let compiledDebug: DebugElement

describe('BeagleErrorComponent - empty', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleTextComponent,
        BeagleButtonComponent,
        BeagleErrorComponent,
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BeagleErrorComponent)
    compiledNative = fixture.debugElement.nativeElement
    compiledDebug = fixture.debugElement

    component = fixture.componentInstance
    component.retry = jest.fn()
    component.errors = []
    component.showingDetails = false

    fixture.detectChanges()
  })

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot()
  })

  it('Should not render details when no error is provided', () => {
    const showDetailsButton = compiledNative.querySelectorAll('.show-details-button')
    const errorsDetailedContainer = compiledNative.querySelectorAll('.errors-detailed-container')

    expect(showDetailsButton.length).toBe(0)
    expect(errorsDetailedContainer.length).toBe(0)
  })

  it('Should call retry function on click', () => {
    const button = compiledDebug.query(By.css('.retry-button')).componentInstance as BeagleButtonComponent
    button.handleClick()
    expect(component.retry).toHaveBeenCalled()
  })
})

describe('BeagleErrorComponent - with errors', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleTextComponent,
        BeagleButtonComponent,
        BeagleErrorComponent,
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(BeagleErrorComponent)
    compiledNative = fixture.debugElement.nativeElement
    compiledDebug = fixture.debugElement

    component = fixture.componentInstance
    component.retry = jest.fn()
    component.errors = [{ message: 'First Message' }, { message: 'Second Message' }]
    component.showingDetails = false

    fixture.detectChanges()
  })

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot()
  })

  it('Should call retry function on click', () => {
    const button = compiledDebug.query(By.css('.retry-button')).componentInstance as BeagleButtonComponent
    button.handleClick()
    expect(component.retry).toHaveBeenCalled()
  })

  it('Should render details when error list is provided', () => {
    const showDetailsButton = compiledNative.querySelectorAll('.show-details-button')
    const errorsDetailedContainer = compiledNative.querySelectorAll('.errors-detailed-container')

    expect(showDetailsButton.length).toBe(1)
    expect(errorsDetailedContainer.length).toBe(1)

    const errorMessages = errorsDetailedContainer[0].querySelectorAll('p')

    expect(errorMessages.length).toBe(2)
  })

  it('Should not add the class when the show more button was not clicked', () => {
    const errorsDetailedContainer = compiledNative.querySelector('.errors-detailed-container')
    const showContainer = errorsDetailedContainer?.querySelectorAll('.show')

    expect(showContainer?.length).toBe(0)
  })

  it('Should add the class when the show more button was clicked', () => {
    const button = compiledDebug.query(By.css('.show-details-button')).componentInstance as BeagleButtonComponent
    button.handleClick()
    fixture.detectChanges()

    const errorsDetailedContainer = compiledNative.querySelector('.errors-detailed-container')

    expect(component.showingDetails).toBeTruthy()
    expect(errorsDetailedContainer?.classList.contains('show')).toBeTruthy()

    button.handleClick()
    fixture.detectChanges()

    expect(component.showingDetails).toBeFalsy()
    expect(errorsDetailedContainer?.classList.contains('show')).toBeFalsy()
  })
})
