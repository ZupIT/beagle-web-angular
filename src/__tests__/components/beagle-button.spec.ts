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

import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { BeagleButtonComponent } from '../../components/beagle-button/beagle-button.component';
import { Properties as CSSProperties } from 'csstype'
import { By } from '@angular/platform-browser';
import { BeagleComponent } from '../../runtime/BeagleComponent';
import { Injectable } from '@angular/core';
import { BeagleContext } from '@zup-it/beagle-web/types';

let component: BeagleButtonComponent
let fixture: ComponentFixture<BeagleButtonComponent>;
let mockStyle: CSSProperties = {
  height: '100',
  width: '50'
}

describe('BeagleButtonComponent', () => {


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleButtonComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BeagleButtonComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and set Style', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.style = mockStyle
    component.ngOnInit();

    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.usefulStyle).toEqual(mockStyle)

  });

});
