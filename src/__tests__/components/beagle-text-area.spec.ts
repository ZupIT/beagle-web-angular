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
import { BeagleTextAreaComponent } 
    from '../../components/beagle-text-area/beagle-text-area.component'

let component: BeagleTextAreaComponent
let fixture: ComponentFixture<BeagleTextAreaComponent>

function setAndCallHandler(selector: string, value: string, event: string) {
    fixture.detectChanges()
    tick()

    const input = fixture.debugElement.query(By.css(selector)).nativeElement
    input.value = value
    input.dispatchEvent(new Event(event))
    tick()
}


describe('BeagleTextAreaComponent', () => {


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BeagleTextAreaComponent,
            ],
            imports: [
                FormsModule,
            ],
        }).compileComponents()
        fixture = TestBed.createComponent(BeagleTextAreaComponent)
        component = fixture.componentInstance
        component.value = 'Testing'
        component.label = 'Label Test'
        component.name = 'Label'
        component.disabled = true
        component.readonly = true

    }))

    it('should create the component', () => {
        expect(component).toBeTruthy()
    })

    it('should call on Init', () => {
        spyOn(component, 'ngOnInit').and.callThrough()
        component.ngOnInit()

        expect(component.ngOnInit).toBeCalled()
        expect(component.label).toEqual('Label Test')
        expect(component.disabled).toEqual(true)
        expect(component.readonly).toEqual(true)
    })

    it('should call handlers and set Inputs', fakeAsync(() => {
        spyOn(component, 'handleChange').and.callThrough()
        spyOn(component, 'handleFocus').and.callThrough()
        spyOn(component, 'handleBlur').and.callThrough()

        setAndCallHandler('textarea', 'Testing', 'input')
        setAndCallHandler('textarea', 'Testing', 'focus')
        setAndCallHandler('textarea', 'Testing', 'blur')

        expect(component.handleChange).toHaveBeenCalled()
        expect(component.handleFocus).toHaveBeenCalled()
        expect(component.handleBlur).toHaveBeenCalled()
    }))

 })
