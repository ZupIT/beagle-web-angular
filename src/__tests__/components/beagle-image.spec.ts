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
import { BeagleImageComponent } from '../../components/beagle-image/beagle-image.component'
import { ImagePath, ImagePathMode, ImageMode } from '../../components/schemas/image'

let component: BeagleImageComponent
const imagePathModeMock: ImagePathMode = 'local'
const pathMock: ImagePath = {
  _beagleImagePath_: imagePathModeMock,
  url: 'http://teste.com.br',
}
const imageModeMock: ImageMode = 'FIT_CENTER'

describe('BeagleImageComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleImageComponent,
      ],
    }).compileComponents()

    const fixture = TestBed.createComponent(BeagleImageComponent)
    component = fixture.componentInstance
    component.path = pathMock
    spyOn(component, 'ngOnChanges').and.callThrough()
  }))

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot()
  })

  it('should add imageSource', () => {
    expect(component.imageSource).toEqual('')
    component.ngOnChanges()
    expect(component.imageSource).toEqual('http://teste.com.br')
  })

  it('should add default mode', () => {
    delete component.mode
    component.ngOnChanges()
    expect(component.mode).toEqual(imageModeMock)
  })

})
