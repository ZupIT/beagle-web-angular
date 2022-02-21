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

import { createInterface } from 'readline'

interface UserInput {
  question: string,
  validation?: (answer: string) => string | null,
  defaultValue?: string,
}

export function getUserInput(data: string | UserInput) {
  const dataObject = typeof data === 'object' ? data : { question: data }
  const { question, defaultValue = '', validation } = dataObject

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise<string>((resolve) => {
    function handleAnswer(answer: string) {
      const error = validation && validation(answer)

      if (error) {
        console.log(error)
        readline.question(`${question} `, handleAnswer)
        return
      }

      resolve(answer || defaultValue)
      readline.close()
    }

    readline.question(`${question} `, handleAnswer)
  })
}
