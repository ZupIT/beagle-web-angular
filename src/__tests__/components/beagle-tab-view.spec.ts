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

import { TestBed, async } from '@angular/core/testing'
import { BeagleTabViewComponent } from '../../components/beagle-tab-view/beagle-tab-view.component'
import { TabsService } from '../../components/services/tabs.service'

let component: BeagleTabViewComponent

describe('BeagleTabViewComponent', () => {


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BeagleTabViewComponent,
            ],
            providers: [
                TabsService,
            ],
        }).compileComponents()
        const fixture = TestBed.createComponent(BeagleTabViewComponent)
        component = fixture.componentInstance
    }))

    it('should create the component', () => {
        expect(component).toBeTruthy()
    })

    it('should call on Init', () => {
        spyOn(component, 'ngOnInit').and.callThrough()
        spyOn(component, 'listenTabChanges').and.callThrough()
        component.ngOnInit()

        expect(component.ngOnInit).toBeCalled()
        expect(component.listenTabChanges).toBeCalled()
    })

})
