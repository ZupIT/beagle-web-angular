/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
      }
    ]
  }, [])
}
