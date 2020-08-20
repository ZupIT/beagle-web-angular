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

import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SimpleChange } from '@angular/core'
import { BeagleMarkdownComponent } from '../../components/beagle-markdown/beagle-markdown.component'

let component: BeagleMarkdownComponent
let fixture: ComponentFixture<BeagleMarkdownComponent>
const markdown = '> This is a markdown text'

describe('BeagleMarkdownComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BeagleMarkdownComponent,
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(BeagleMarkdownComponent)
    component = fixture.componentInstance
    component.htmlContainer = fixture.debugElement.query(By.all())
  }))

  it('should call convertMarkdownToHTML and check for created HTML elements', () => {
    spyOn(component, 'convertMarkdownToHTML').and.callThrough()
    component.ngOnChanges({ text: new SimpleChange(null, markdown, true) })
    expect(component.convertMarkdownToHTML).toHaveBeenCalled()
    const blockquote = fixture.nativeElement.querySelector('blockquote')
    const p = fixture.debugElement.nativeElement.querySelector('p')
    expect(blockquote && p).toBeTruthy()
    expect(p.innerHTML).toEqual('This is a markdown text')

  })

})
