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
import { BeagleModalComponent } from '../../components/beagle-modal/beagle-modal.component';

let component: BeagleModalComponent;
let fixture: ComponentFixture<BeagleModalComponent>;


describe('BeagleImageComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BeagleModalComponent,
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BeagleModalComponent);
        component = fixture.componentInstance;

    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call on Init', () => {
        spyOn(component, 'ngOnInit').and.callThrough()
        component.ngOnInit()
        expect(component.ngOnInit).toBeCalled();
    });

    it('should call on Destroy', () => {
        spyOn(component, 'ngOnDestroy').and.callThrough()
        component.ngOnDestroy()
        expect(component.ngOnDestroy).toBeCalled();
    });

    it('should call handleClose', () => {
        spyOn(component, 'handleClose').and.callThrough()
        component.handleClose()
        expect(component.handleClose).toBeCalled();
    });

    it('should call closeOnEsc', () => {
        spyOn(component, 'closeOnEsc').and.callThrough()
        let event = new KeyboardEvent('event', { key: 'Escape' });
        component.closeOnEsc(event)
        expect(component.closeOnEsc).toBeCalled();
    });

    it('should call closeOnClick', () => {
        spyOn(component, 'closeOnClick').and.callThrough()
        component.closeOnClick({ target: { className: 'modal-background' } })
        expect(component.closeOnClick).toBeCalled();
    });


});
