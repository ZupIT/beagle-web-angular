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
import { Injectable } from '@angular/core'
import createCoreBeagleUIService, { DefaultSchema } from '@zup-it/beagle-web'
import { BeagleAngularConfig, BeagleAngularUIService } from '../types'
import { defaultComponents } from '../constants'
import beagleMapKeysConfig from './utils/beagle-map-keys-config'

@Injectable()
export class BeagleProvider {
  private service: BeagleAngularUIService | undefined

  start<Schema = DefaultSchema>(config: BeagleAngularConfig<Schema>) {
    if (this.service) {
      console.error('Beagle service has already started!')
      return
    }
    
    console.log('Running beagle-angular 1.1.3-rc.2')
    beagleMapKeysConfig.setMapKeysConfig({ ...config.components, ...defaultComponents })
    // @ts-ignore // fixme
    this.service = createCoreBeagleUIService<Schema>({
      ...config,
      components: {
        ...defaultComponents,
        ...config.components,
      },
    })
  }

  getBeagleUIService() {
    return this.service
  }
}
