/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { CliOperation } from '../types'
import { log, ForegroundColor, BackgroundColor, FontStyle } from '../utils/styledLogger'

const OPERATION_COLOR: ForegroundColor = 'gray'
const OPERATION_BACKGROUND: BackgroundColor = 'cyan'
const OPERATION_FONT_STYLE: FontStyle = 'bold'
const TITLES_COLOR: ForegroundColor = 'cyan'

function logOperationName(name: string) {
  log({
    text: ` ${name} `,
    color: OPERATION_COLOR,
    background: OPERATION_BACKGROUND,
    style: OPERATION_FONT_STYLE,
  }) 
}

function logDescription(description: string) {
  log(
    { text: 'Description: ', color: TITLES_COLOR },
    description,
  )
}

function logTable(headers: string[], rows: string[][]) {
  function getColumnMaxLength(columnIndex: number) {
    let max = headers[columnIndex].length
    rows.forEach(row => {
      if (row[columnIndex].length > max) max = row[columnIndex].length
    })
    return max
  }

  function fillWith(stringToFill: string, charToFillWith: string, desiredLength: number) {
    let newStr = stringToFill
    while(newStr.length < desiredLength) newStr = `${newStr}${charToFillWith}`
    return newStr
  }

  function logRow(columns: string[], columnLengths: number[], spaceChar = ' ') {
    const columnsWithSpaces = columns.map(
      (value, index) => fillWith(value, spaceChar, columnLengths[index]),
    )
    console.log(`| ${columnsWithSpaces.join(' | ')} |`)
  }

  const columnMaxLengths = headers.map((_, index) => getColumnMaxLength(index))
  logRow(headers, columnMaxLengths)
  logRow(headers.map(() => ''), columnMaxLengths, '-')
  rows.forEach(row => logRow(row, columnMaxLengths))
}

function logOptions(options?: CliOperation['options']) {
  if (!options) return
  log({ text: 'Options:', color: TITLES_COLOR })
  const headers = ['Name', 'Description', 'Example']
  const rows = options.map(({ name, description, example}) => [name, description, example || ''])
  logTable(headers, rows)
}

function logOperationHelp(name: string, data: CliOperation) {
  logOperationName(name)
  logDescription(data.description)
  logOptions(data.options)
  console.log('\n')
}

function runHelp(cliOperations: Record<string, CliOperation>) {
  const operationNames = Object.keys(cliOperations)
  operationNames.forEach(name => logOperationHelp(name, cliOperations[name]))
}

export default runHelp
