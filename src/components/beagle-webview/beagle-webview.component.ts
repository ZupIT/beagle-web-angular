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

import { Component, OnInit, Input, ViewEncapsulation, SecurityContext } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { BeagleWebviewInterface } from '../schemas/webview'

@Component({
  selector: 'beagle-webview',
  templateUrl: './beagle-webview.component.html',
  styleUrls: ['./beagle-webview.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleWebviewComponent implements OnInit, BeagleWebviewInterface {

  @Input() url: string;
  @Input() styleId?= '';
  iframeUrl
  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      (this.sanitizer.sanitize(SecurityContext.URL, this.url)) || '')
  }

}

