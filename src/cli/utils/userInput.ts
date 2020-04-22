/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
