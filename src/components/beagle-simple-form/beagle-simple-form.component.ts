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

import { Component, ElementRef, Input, ViewChild } from '@angular/core'
import { SimpleFormInterface } from '../schemas/simple-form'

@Component({
  selector: 'beagle-simple-form',
  templateUrl: './beagle-simple-form.component.html',
})
export class BeagleSimpleFormComponent implements SimpleFormInterface {

  @Input() onSubmit: () => void
  @Input() onValidationError: () => void
  @ViewChild('formReference') formReference: ElementRef

  lookUpInputErrors(): boolean {
    const elements: Element[] = Array.from(this.formReference.nativeElement.children)
    elements.map((item) => {
      if (item.children) {
        const children = Array.from(item.children)
        children.map((item) => {
          if (item.nodeName === 'BEAGLE-INPUT') {
            if (item.getAttribute('ng-reflect-error')) {
              return false
            }
          }
        })
      }
    })
    return true
  }

  handleSubmit(event: Event) {
    event.preventDefault()

    const canSubmitForm = this.lookUpInputErrors()

    if (canSubmitForm) {
      this.onSubmit && this.onSubmit()
    } else {
      this.onValidationError && this.onValidationError()
    }
  }
}
