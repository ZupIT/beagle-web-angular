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

export enum ImageContentMode {
  FIT_XY = 'fit-xy',
  FIT_CENTER = 'fit-center',
  CENTER_CROP = 'center-crop',
  CENTER = 'center',
}

export enum TextAlignment {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  INHERIT = 'inherit',
}

export enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export enum NavigationType {
  OPEN_DEEP_LINK,
  ADD_VIEW,
  SWAP_VIEW,
  FINISH_VIEW,
  POP_VIEW,
  POP_TO_VIEW,
  PRESENT_VIEW
}
