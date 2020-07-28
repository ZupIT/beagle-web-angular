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

import { TestBed, async } from '@angular/core/testing';
import { BeagleTabItemComponent } from '../../components/beagle-tab-item/beagle-tab-item.component';
import { TabsService } from '../../components/services/tabs.service';
import { ImagePath, ImagePathMode } from '../../components/schemas/image';

let component: BeagleTabItemComponent
const imagePathModeMock: ImagePathMode = "local"
const pathMock: ImagePath = {
    _beagleImagePath_: imagePathModeMock,
    url: 'http://teste.com.br',
}

describe('BeagleTabItemComponent', () => {


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BeagleTabItemComponent
            ],
            providers: [
                TabsService
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(BeagleTabItemComponent);
        component = fixture.componentInstance;
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should check Inputs', () => {
        component.icon = pathMock;
        component.title = 'Tab Title';
        expect(typeof (component.title)).toBe('string');
        expect(typeof (component.icon)).toBe('object');
        expect(typeof (component.active)).toBe('boolean');
    });

    it('should call on Destroy', () => {
        spyOn(component, 'ngOnDestroy').and.callThrough();
        component.ngOnDestroy()
        expect(component.ngOnDestroy).toBeCalled();
    });

    it('should call on listenTabChanges', () => {
        spyOn(component, 'listenTabChanges').and.callThrough();
        component.listenTabChanges()
        expect(component.listenTabChanges).toBeCalled();
    });

});
