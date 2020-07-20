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
import { BeagleImageComponent } from '../../components/beagle-image/beagle-image.component';
import { ImagePath, ImagePathMode, Accessibility, ImageMode } from '../../components/schemas/image';
import { BeagleComponent } from '../../runtime/BeagleComponent';
import { BeagleContext } from '../../types';

class beagleComponentMock extends BeagleComponent {
    getBeagleContext: (() => BeagleContext)
}

let component: BeagleImageComponent
const imagePathModeMock: ImagePathMode = "local"
const pathMock: ImagePath = {
    _beagleImagePath_: imagePathModeMock,
    url: 'http://teste.com.br',
}
const accessibilityMock: Accessibility = {
    accessible: true,
    accessibilityLabel: '',
}
const imageModeMock: ImageMode = "FIT_CENTER"

describe('BeagleImageComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BeagleImageComponent
            ]
        }).compileComponents();

        // const beagleComponent = TestBed.get(beagleComponentMock)
        // console.log('COMPONENTE',beagleComponent)
        // spyOn(beagleComponent,'getBeagleContext').and.callThrough();

        const fixture = TestBed.createComponent(BeagleImageComponent);
        component = fixture.componentInstance;
        console.log('COMPONENT', component);
        component.path = pathMock

    }));

      it('should create the component', () => {
        expect(component).toBeTruthy();
      });

      it(`should check all the Inputs`, () => {
        expect(typeof(component.path)).toEqual("object")
        expect(component.mode).toEqual(imageModeMock)
        expect(component.accessibility).toEqual(accessibilityMock)
        expect(component.imageSource).toEqual('')

      });

    it('should call afterViewInit', () => {
        jest.spyOn(component,'getBeagleContext')
        spyOn(component,'ngAfterViewInit').and.callThrough()
        component.ngAfterViewInit();
        expect(component.ngAfterViewInit).toHaveBeenCalled();
    });

});
