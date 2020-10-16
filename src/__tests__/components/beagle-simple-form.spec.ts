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
import { BeagleSimpleFormComponent }
  from '../../components/beagle-simple-form/beagle-simple-form.component'

let component: BeagleSimpleFormComponent
let fixture: ComponentFixture<BeagleSimpleFormComponent>


describe('BeagleSimpleFormComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleSimpleFormComponent,
      ],
      imports: [
        FormsModule,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(BeagleSimpleFormComponent)
    component = fixture.componentInstance
    component.onSubmit = jest.fn()
  }))

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('should trigger on Submit', fakeAsync(() => {
    spyOn(component, 'handleSubmit').and.callThrough()
    component.handleSubmit(new Event('submit', {}))
    expect(component.onSubmit).toBeCalled()
  }))

})
