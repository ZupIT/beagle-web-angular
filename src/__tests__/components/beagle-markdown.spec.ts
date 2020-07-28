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

import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SimpleChanges, SimpleChange, ElementRef } from '@angular/core'
import { BeagleMarkdownComponent } from '../../components/beagle-markdown/beagle-markdown.component'

let component: BeagleMarkdownComponent
let fixture: ComponentFixture<BeagleMarkdownComponent>
const markdown = '> This is a markdown **text**'


describe('BeagleImageComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BeagleMarkdownComponent,
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(BeagleMarkdownComponent)
        component = fixture.componentInstance
        component.htmlContainer = fixture.debugElement.query(By.all())
        component.htmlContainer.nativeElement.innerHtml = ''
    }))

    it('should create the component', () => {
        expect(component).toBeTruthy()
    })

    it('should call ngOnChanges and convertMarkdownToHTML thoroughly', () => {

        spyOn(component, 'ngOnChanges').and.callThrough()
        spyOn(component, 'convertMarkdownToHTML').and.callThrough()

        component.ngOnChanges({ text: new SimpleChange(null, markdown, true) })

        expect(component.ngOnChanges).toHaveBeenCalled()
        expect(component.convertMarkdownToHTML).toHaveBeenCalled()
    })

    it('should return on second condition on convertMarkdownToHTML', () => {

        spyOn(component, 'convertMarkdownToHTML').and.callThrough()
        component.convertMarkdownToHTML('')
        expect(component.convertMarkdownToHTML).toHaveBeenCalled()
    })


    it('should return on first condition on convertMarkdownToHTML', () => {
        delete component.htmlContainer
        spyOn(component, 'convertMarkdownToHTML').and.callThrough()
        component.convertMarkdownToHTML('')
        expect(component.convertMarkdownToHTML).toHaveBeenCalled()
    })

})
