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

import { readFileSync, writeFileSync } from 'fs'
import BeagleCliError from '../errors'

function getGitIgnore() {
  const root = process.cwd()
  try {
    return readFileSync(`${root}/.gitignore`, { encoding: 'utf8' })
  } catch {
    throw new BeagleCliError('Could not find your .gitignore file!')
  }
}

function getGitIgnoreSection(gitignore: string, section: string) {
  const sectionRegex = new RegExp(`^# ${section}$(\\n^[\\/\\.\\w\\d_-]+$)*`, 'gm')
  const match = gitignore.match(sectionRegex)
  
  return {
    content: match ? match[0] : '',
    replaceInGitIgnore: (newContent: string) => {
      if (match) return gitignore.replace(sectionRegex, newContent)
      const lineBreak = gitignore.endsWith('\n') ? '\n' : '\n\n'
      return `${gitignore}${lineBreak}# ${section}${newContent}\n`
    },
  }
}

export function addToGitIgnore(paths: string | string[], section: string) {
  const root = process.cwd()
  const pathArray = paths instanceof Array ? paths : [paths]
  const gitignore = getGitIgnore()
  const gitSection = getGitIgnoreSection(gitignore, section)
  let hasChanged = false

  const newContent = pathArray.reduce((str, path) => {
    if (str.match(path)) return str
    hasChanged = true
    return `${str}\n${path}`
  }, gitSection.content)

  if (hasChanged) writeFileSync(`${root}/.gitignore`, gitSection.replaceInGitIgnore(newContent))
  return hasChanged
}
