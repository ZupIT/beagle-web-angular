/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
