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

import { Pipe, PipeTransform } from '@angular/core'
import { BeagleUIElement } from '@zup-it/beagle-web'

@Pipe({
    name: 'prioritizePosition'
})
export class PrioritizePositionPipe implements PipeTransform {
    transform(elements: BeagleUIElement[]) {
        if (!elements.some(e => e.style?.positionType && 
            (['fixed', 'absolute'].some(p => p === (e?.style?.positionType.toLowerCase() || ''))))) {
            return elements
        }

        return elements.sort((a, b) => {
            const positionA = a.style?.positionType.toLowerCase() || ''
            const positionB = b?.style?.positionType.toLowerCase() || ''

            if (positionA &&
                (positionA === 'fixed' ||
                    positionA === 'fixed' && positionB === 'absolute' ||
                    positionA === 'absolute' && !positionB)) {
                return +(a > b) - 1
            }
            return 0
        })
    }
}
