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

export type AngularEngine = 'ViewEngine' | 'Ivy'

export interface Option {
  name: string,
  value?: string,
}

export interface CliOperation {
  description: string,
  options?: { name: string, description: string, example?: string }[],
  run: (options: Option[]) => void | Promise<void>,
}

export interface InitApplicationData {
  beagleModulePath: string,
  componentsModulePath?: string,
  componentsModuleName?: string,
  baseUrl?: string,
  outputPath: string,
  angularEngine: AngularEngine,
  isNpm: boolean,
  isBeagleModuleCreated: boolean,
}
