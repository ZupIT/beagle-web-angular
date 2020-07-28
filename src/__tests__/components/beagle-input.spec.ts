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

import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { BeagleInputComponent } from '../../components/beagle-input/beagle-input.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser'


let component: BeagleInputComponent
let fixture: ComponentFixture<BeagleInputComponent>;


describe('BeagleImageComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                BeagleInputComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BeagleInputComponent);
        component = fixture.componentInstance;

    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });


    it(`should call on init and set Inputs`, () => {
        spyOn(component, 'ngOnInit').and.callThrough();
        component.ngOnInit();
        expect(component.ngOnInit).toBeCalled()

        expect(typeof (component.value)).toEqual("string")
        expect(typeof (component.placeholder)).toEqual("string")
        expect(typeof (component.disabled)).toEqual("boolean")
        expect(typeof (component.readOnly)).toEqual("boolean")
        expect(typeof (component.type)).toEqual("string")
        expect(typeof (component.hidden)).toEqual("boolean")
    });

    it(`should call handlers and set Inputs`, fakeAsync(() => {
        spyOn(component, 'handleChange').and.callThrough();
        spyOn(component, 'handleFocus').and.callThrough();
        spyOn(component, 'handleBlur').and.callThrough();

        setAndCallHandler('input', 'Testing', 'input')
        setAndCallHandler('input', 'Testing', 'focus')
        setAndCallHandler('input', 'Testing', 'blur')

        expect(component.handleChange).toHaveBeenCalled()
        expect(component.handleFocus).toHaveBeenCalled()
        expect(component.handleBlur).toHaveBeenCalled()
    }));

    function setAndCallHandler(selector: string, value: string, event: string) {
        fixture.detectChanges();
        tick();

        let input = fixture.debugElement.query(By.all()).nativeElement;
        input.value = value;
        input.dispatchEvent(new Event(event));
        tick();
    }

});
