/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
    }
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
