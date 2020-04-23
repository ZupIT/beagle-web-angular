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

const terminalFgColors = {
  blue: [34, 89],
  yellow: [33, 89],
  red: [31, 89],
  cyan: [36, 89],
  green: [32, 89],
  magenta: [35, 89],
  white: [37, 89],
  gray: [30, 89],
  brightRed: [91, 39],
  brightGreen: [92, 39],
  brightYellow: [93, 39],
  brightBlue: [94, 39],
  brightMagenta: [95, 39],
  brightCyan: [96, 39],
  brightWhite: [97, 39],
}

const terminalBgColors = {
  black: [40, 49],
  red: [41, 49],
  green: [42, 49],
  yellow: [43, 49],
  blue: [44, 49],
  magenta: [45, 49],
  cyan: [46, 49],
  white: [47, 49],
  brightBlack: [100, 49],
  brightRed: [101, 49],
  brightGreen: [102, 49],
  brightYellow: [103, 49],
  brightBlue: [104, 49],
  brightMagenta: [105, 49],
  brightCyan: [106, 49],
  brightWhite: [107, 49],
}

const terminalFontStyles = {
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],
}

export type ForegroundColor = keyof typeof terminalFgColors
export type BackgroundColor = keyof typeof terminalBgColors
export type FontStyle = (keyof typeof terminalFontStyles) | (keyof typeof terminalFontStyles)[]

interface StyledLog {
  text: string,
  color?: ForegroundColor,
  background?: BackgroundColor,
  style?: FontStyle,
}

export function log(...toLog: (string | StyledLog)[]) {
  const logs = toLog.map(item => typeof item === 'string' ? { text: item } : item)

  const styleString = logs.map(({ color, background, style }) => {
    if (!color && !background && !style) return '%s'
    const styleArray = style instanceof Array ? style : [style] 
    const codesForStyling: number[][] = []

    if (color) codesForStyling.push(terminalFgColors[color])
    if (background) {
      // windows doesn't mix background colors with foreground colors very well
      if (process.platform === 'win32') codesForStyling.push(terminalFontStyles.reset)
      codesForStyling.push(terminalBgColors[background])
    }
    if (style) codesForStyling.push(...styleArray.map(st => terminalFontStyles[st!]))

    const { prefix, suffix } = codesForStyling.reduce(({ prefix, suffix }, codes) => ({
      prefix: `${prefix}\x1b[${codes[0]}m`,
      suffix: `\x1b[${codes[1]}m${suffix}`,
    }), { prefix: '', suffix: '' })

    return `${prefix}%s${suffix}\x1b[0m`
  })

  console.log(styleString.join(''), ...logs.map(({ text }) => text))
}

export function logError(text: string) {
  log(
    { text: ' Error! ', color: 'white', background: 'brightRed', style: 'bold' },
    ` ${text}`,
  )
}

export function logSuccess(text: string) {
  log(
    { text: ' Done! ', color: 'gray', background: 'green', style: 'bold' },
    ` ${text}`,
  )
}

export function logWarning(text: string) {
  log(
    { text: ' Warning ', color: 'gray', background: 'yellow', style: 'bold' },
    ` ${text}`,
  )
}

export function logInfo(text: string) {
  log(
    { text: ' Info ', color: 'gray', background: 'cyan', style: 'bold' },
    ` ${text}`,
  )
}
