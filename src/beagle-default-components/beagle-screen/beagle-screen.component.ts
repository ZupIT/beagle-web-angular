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

import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core'
import { BeagleImageComponent } from '../../runtime/BeagleImageComponent'
import { NavigationBar } from '../../types'

@Component({
  selector: 'beagle-screen',
  templateUrl: './beagle-screen.component.html',
  styleUrls: ['./beagle-screen.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class BeagleScreenComponent implements OnInit {

  @Input() identifier?: string
  @Input() navigationBar?: NavigationBar

  ngOnInit() {
    if (this.navigationBar && this.navigationBar.navigationBarItems) {
      this.navigationBar.navigationBarItems.forEach((item) => {
        if (item && item.image) {
          item.image = BeagleImageComponent.imagesLocation + item.image
        }
      })
    }
  }


  handleClick(index: number) {
    //TODO: depois de definir comunicação entre componentes
    // tratar o click com a action associada nesta função
  }
}
