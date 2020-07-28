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
import { BeagleErrorComponent } from '../../components/beagle-error/beagle-error.component';
import { BeagleTextComponent } from '../../components/beagle-text/beagle-text.component';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserTestingModule } from '@angular/platform-browser/testing'

let component: BeagleErrorComponent;
let fixture: ComponentFixture<BeagleErrorComponent>;


describe('BeagleImageComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BeagleErrorComponent,
                BeagleTextComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BeagleErrorComponent);
        component = fixture.componentInstance;

    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

});
