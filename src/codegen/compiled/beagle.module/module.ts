/*
  * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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

import { removeExtraIndentation } from '../../utils/formatting'
import { originalBeagleModuleName } from './imports'

interface Params {
  componentsModuleName: string,
  beagleModuleName: string,
  hasDefaultModule: boolean,
}

export function createModuleString({ 
  componentsModuleName, 
  beagleModuleName, 
  hasDefaultModule,
}: Params) {
  const defaultModule = hasDefaultModule ? ', BeagleDefaultComponentsModule' : ''
  const moduleString = `
    @NgModule({
      declarations: [
        BeagleRemoteView,
      ],
      exports: [
        BeagleRemoteView${defaultModule},
      ],
      imports: [
        CommonModule, 
        ViewContentManagerModule, 
        ${componentsModuleName} ${defaultModule},
      ],
      providers: [
        BeagleProvider, 
        { 
          provide: BeagleAngularNavigatorService, 
          useFactory: (provider: BeagleProvider) => new BeagleAngularNavigatorService(provider),
          deps: [BeagleProvider],
        },
      ],
    })
    export class ${beagleModuleName} {
      constructor(provider: BeagleProvider, navigatorService: BeagleAngularNavigatorService) {
        const config = getBeagleConfigMetadata(${originalBeagleModuleName})
        provider.start(config)
        navigatorService.create()
      }
    }
  `
  
  return removeExtraIndentation(moduleString, 4)
}
