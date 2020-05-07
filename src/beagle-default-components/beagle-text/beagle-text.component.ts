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

import { Component, Input, OnInit } from '@angular/core'
import { TextAlignment } from '../../enums'

@Component({
  selector: 'beagle-text',
  templateUrl: './beagle-text.component.html',
  styleUrls: ['./beagle-text.component.less'],
})
export class BeagleTextComponent implements OnInit {

  @Input() text: string
  @Input() theme? = ''
  @Input() textColor? = ''
  @Input() alignment?: TextAlignment

  ngOnInit() {
    this.fillDefaultVariables()
  }

  fillDefaultVariables(){
    this.textColor = this.textColor || 'inherit'
    this.alignment = this.alignment || TextAlignment.INHERIT
  }
}
