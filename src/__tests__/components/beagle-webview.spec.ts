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

import { TestBed, async } from '@angular/core/testing'
import { SafeResourceUrl } from '@angular/platform-browser'
import { BeagleWebviewComponent } from '../../components/beagle-webview/beagle-webview.component'
import { buildBeagleTestModuleMetadata } from './test-module-builder'

let component: BeagleWebviewComponent
interface SafeUrl extends SafeResourceUrl {
  changingThisBreaksApplicationSecurity: string,
}
describe('BeagleWebviewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule(buildBeagleTestModuleMetadata([BeagleWebviewComponent]))
      .compileComponents()
      
    const fixture = TestBed.createComponent(BeagleWebviewComponent)
    component = fixture.componentInstance
    component.url = 'http://www.test.com'
  }))

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    spyOn(component, 'ngOnInit').and.callThrough()
    component.ngOnInit()
    const safe: SafeUrl = { changingThisBreaksApplicationSecurity: 'http://www.test.com' }
    expect(component.iframeUrl).toEqual(safe)
  })
})
