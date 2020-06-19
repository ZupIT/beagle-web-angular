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

import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core'
import { Converter } from 'showdown'
import { BeagleTextInterface } from '../schemas/text'

@Component({
  selector: 'beagle-markdown',
  templateUrl: './beagle-markdown.component.html',
  styleUrls: ['./beagle-markdown.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleMarkdownComponent implements BeagleTextInterface {

  public converter = new Converter()
  @ViewChild('htmlContainer') htmlContainer: ElementRef;
  @Input()
  set text(inputText: string) {
    this.convertMarkdownToHTML(inputText)
  }

  convertMarkdownToHTML(inputText: string) {
    if (!this.htmlContainer) return

    if (!inputText) {
      this.htmlContainer.nativeElement.innerHTML = ''
      return
    }

    this.htmlContainer.nativeElement.innerHTML = this.converter
      .makeHtml(inputText)
      .replace(/<a ([^>]*)>/g, '<a target="_blank" $1>')
  }

}
