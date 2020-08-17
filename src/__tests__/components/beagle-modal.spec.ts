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
import { BeagleModalComponent } from '../../components/beagle-modal/beagle-modal.component'

let component: BeagleModalComponent
let fixture: ComponentFixture<BeagleModalComponent>


describe('BeagleImageComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleModalComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(BeagleModalComponent)
    component = fixture.componentInstance
    component.onClose = jest.fn()
  }))

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('should call onClose', () => {
    spyOn(component, 'handleClose').and.callThrough()
    component.handleClose()
    expect(component.onClose).toBeCalled()
  })

  it('should call onCLose on Esc event', () => {
    spyOn(component, 'closeOnEsc').and.callThrough()
    const event = new KeyboardEvent('event', { key: 'Escape' })
    component.closeOnEsc(event)
    expect(component.onClose).toBeCalled()
  })

  it('should call onClose on modal background click event', () => {
    spyOn(component, 'closeOnClick').and.callThrough()
    component.closeOnClick({ target: { className: 'modal-background' } })
    expect(component.onClose).toBeCalled()
  })


})
