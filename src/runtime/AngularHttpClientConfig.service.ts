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

export interface AngularHttpClientConfig {
  setService: (service: any, method: string) => void,
  requestBeagle: (url: RequestInfo, optionsRequest?: RequestInit) => Promise<Response>,
}

function createBeagleHttpClient(): AngularHttpClientConfig {
  let httpService: any
  let requestMethod: string

  return {
    setService: (service, method) => {
      httpService = service
      requestMethod = method
    },
    requestBeagle: (url: RequestInfo, optionsRequest?: RequestInit) => {
      if (!httpService || !requestMethod) {
        throw new Error('Undefined service or method. Please set them before using')
      }

      if (!httpService[requestMethod]) {
        throw new Error('Invalid service method. Please set a valid method')
      }

      const { body, headers, method } = optionsRequest || {}
      const httpRequestOptions = { observe: 'response', body, headers }
      
      return new Promise(async (resolve) => {
        const request =
          await httpService[requestMethod](url, method || 'get', httpRequestOptions).toPromise()
        request.json = async () => request.body
        resolve(request)
      })
    },
  }
}

export const AngularHttpClientConfig = createBeagleHttpClient()
