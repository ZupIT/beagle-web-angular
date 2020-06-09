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

import { DefaultSchema } from '@zup-it/beagle-web'
import { ComponentName } from '@zup-it/beagle-web/types'
import { BeagleAngularConfig } from '../../types'

function createBeagleMapKeysConfig <Schema = DefaultSchema>()  {
  let mapLowercaseConfig: Record<string, string>

    
  function createMapOfKeys(components: BeagleAngularConfig<Schema>['components']) {
    const keys = Object.keys(components)
    mapLowercaseConfig = keys.reduce((result, key) => 
      ({ ...result, [key.toLowerCase()]: key }), {})
  }

  return {
    setMapKeysConfig: (components: BeagleAngularConfig<Schema>['components']) => 
      createMapOfKeys(components),
    getComponent: <T>(name: ComponentName<T>) => 
      mapLowercaseConfig[(name as string).toLowerCase()],
  }
}

const beagleMapKeysConfig = createBeagleMapKeysConfig()

export default beagleMapKeysConfig
