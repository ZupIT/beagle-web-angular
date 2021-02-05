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

import { Console } from 'console'
import { Component, ElementRef, Input, ViewChild, ViewChildren } from '@angular/core'
import { SimpleFormInterface } from '../schemas/simple-form'

@Component({
  selector: 'beagle-simple-form',
  templateUrl: './beagle-simple-form.component.html',
})
export class BeagleSimpleFormComponent implements SimpleFormInterface {

  @Input() onSubmit: () => void
  @Input() onValidationError: () => void
  @ViewChild('formReference') formReference: ElementRef

  lookUpInputErrors(elementReference): boolean {
    const children = elementReference.children

    for (const item of children) {
      if (item.nodeName === 'INPUT') {
        const inputClasses = item.classList
        if (inputClasses.contains('_beagleFormError')) return true
      }
      if (item.children)
        {if (this.lookUpInputErrors(item)) return true}
    }

    return false
  }

  handleSubmit(event: Event) {
    event.preventDefault()

    const hasError = this.lookUpInputErrors(this.formReference.nativeElement)
    if (hasError) {
      this.onValidationError && this.onValidationError()
    } else {
      this.onSubmit && this.onSubmit()
    }
  }
}
