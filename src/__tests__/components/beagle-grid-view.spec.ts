/*
  * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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
import { BeagleGridViewComponent }
  from '../../components/dynamic-lists/beagle-grid-view/beagle-grid-view.component'
import { DynamicListComponent } from '../../components/dynamic-lists/dynamic-list.component'
import { buildBeagleTestModuleMetadata } from './test-module-builder'

let component: BeagleGridViewComponent
let fixture: ComponentFixture<BeagleGridViewComponent>

describe('BeagleGridViewComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule(buildBeagleTestModuleMetadata(
      [BeagleGridViewComponent, DynamicListComponent]))
      .compileComponents()

    fixture = TestBed.createComponent(BeagleGridViewComponent)
    component = fixture.componentInstance
  }))

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

})
