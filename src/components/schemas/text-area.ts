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

import { Properties as CSSProperties } from 'csstype'
import { InputHandler } from './input-handler'

/**
 * @deprecate since version 1.8.0.
 * This interface will be removed in a future version.
*/
export interface TextAreaInterface {
  value?: string,
  label?: string,
  name?: string,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
  disabled?: boolean,
  readonly?: boolean,
  styleId?: string,
  style?: CSSProperties,
}
