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

import { ComponentFactory } from '@angular/core'
import { contextSelector } from '../../constants'

interface ComponentInfo {
  beagleType: string,
  selector: string,
  inputs: ComponentFactory<any>['inputs'],
}

function kebabToCamelCase(str: string) {
  return str.replace(/-\w/g, ([_, letter]) => letter.toUpperCase())
}

function createTemplateForComponent(selector: string, inputs: ComponentFactory<any>['inputs']) {
  const templateName = kebabToCamelCase(selector)
  const templateInputs = inputs.map(input => 
    `let-${input.propName}="tree.${input.propName}"`).join(' ')
  const componentInputs = inputs.map(input =>
    `[${input.templateName}]="${input.propName}"`).join(' ')
  const contextDirective = `${contextSelector} [_elementId]="beagleId" [_viewId]="viewId"`
  const addStyleId = inputs.findIndex((item) => item.propName === 'styleId')
  const styleIdVariable = addStyleId >= 0 ? '' : 'let-styleId="tree.styleId"'
  
  const addStyle = inputs.findIndex((item) => item.propName === 'style')
  const styleVariable = addStyle >= 0 ? '' : 'let-style="tree.style"'

  return `
    <ng-template #${templateName} ${templateInputs} ${styleIdVariable} ${styleVariable} let-children="tree.children"
      let-beagleId="tree.id">
      <${selector} ${componentInputs} ${contextDirective} [attr.data-beagle-id]="beagleId"
        [ngClass]="styleId || ''" [ngStyle]="style">
        <ng-container *ngFor="let child of children; trackBy: elementIdentity">
          <ng-container 
            *ngTemplateOutlet="getTemplate(child._beagleComponent_);context:{tree: child}">
          </ng-container>
        </ng-container>
      </${selector}>
    </ng-template>
  `
}

export function createRemoteViewTemplate(components: ComponentInfo[]) {
  const componentTemplates = components.map(({ selector, inputs }) => (
    createTemplateForComponent(selector, inputs)
  ))

  const containerTemplate = `
    <ng-container #__view_container>
      <ng-container *ngIf="!!tree">
        <ng-container *ngTemplateOutlet="getTemplate(tree._beagleComponent_);context:{tree: tree}">
        </ng-container>
      </ng-container>
    </ng-container>
  `

  const fullTemplate = `${componentTemplates.join('')}${containerTemplate}`
  const ngTemplateIds = components.reduce((result, component) => ({
    ...result,
    [component.beagleType]: kebabToCamelCase(component.selector),
  }), {})

  return { fullTemplate, ngTemplateIds, componentTemplates, containerTemplate }
}
