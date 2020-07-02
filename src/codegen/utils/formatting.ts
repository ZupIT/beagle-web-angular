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

export function kebabToCamelCase(str: string) {
  return str.replace(/-\w/g, ([_, letter]) => letter.toUpperCase())
}

export function removeExtraIndentation(code: string, numberOfExtraSpaces: number) {
  return code
    .replace(new RegExp(`\\n\\s{${numberOfExtraSpaces}}`, 'g'), '\n')
    .replace(/^\n/, '')
    .replace(/\s*$/, '')
}

/* function created to make a workaround on ivy problem,
which cause queries with two points or hyphen doesn't work*/
export function replaceToUnderline(str: string) {
  return str && str.replace(/[^\d\w_]/g, '_')
}
