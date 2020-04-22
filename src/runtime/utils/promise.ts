/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

export interface StaticPromise<T> {
  resolve: (value: any) => void,
  reject: (error: any) => void,
  promise: Promise<T>,
}

export function createStaticPromise<T = any>() {
  const staticPromise: Partial<StaticPromise<T>> = {}

  staticPromise.promise = new Promise((resolve, reject) => {
    staticPromise.resolve = resolve
    staticPromise.reject = reject
  })

  return staticPromise as StaticPromise<T>
}