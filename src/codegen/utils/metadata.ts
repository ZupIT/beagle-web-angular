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

import { Type, ComponentFactory } from '@angular/core'
import 'reflect-metadata'
import { ɵReflectionCapabilities as ReflectionCapabilities } from '@angular/core'
import BeagleCodeGenerationError from '../errors'

export function getComponentAnnotations(component: Type<any>) {
  const reflection = new ReflectionCapabilities()
  const annotations = reflection.annotations(component)
  if (!annotations || !annotations.length) {
    throw new BeagleCodeGenerationError(`Couldn't find annotations for component "${component.name || component}"`)
  }
  return annotations[annotations.length - 1]
}

export function getComponentInputs(component: Type<any>): ComponentFactory<any>['inputs'] {
  const reflection = new ReflectionCapabilities()
  const props = reflection.propMetadata(component)
  const propNames = Object.keys(props)
  return propNames.reduce((result, name) => {
    const prop = props[name][0]
    const decoratorPrototype: any = Reflect.getPrototypeOf(prop)
    if (decoratorPrototype.ngMetadataName !== 'Input') return result
    return [
      ...result,
      {
        propName: name,
        templateName: prop.bindingPropertyName ? prop.bindingPropertyName : name,
      },
    ]
  }, [])
}
