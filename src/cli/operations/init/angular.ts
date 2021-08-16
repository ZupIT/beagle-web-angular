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

import { writeFileSync } from 'fs'
import BeagleCliError from '../../errors'
import { AngularEngine } from '../../types'
import { ensurePathExistence, getEnvironmentPaths } from '../../utils/object'
import { getPackageVersion } from '../../utils/packages'
import { logWarning } from '../../utils/styledLogger'

const SUPPORTED_ANGULAR_VERSIONS = { min: 7, max: 12 }

export function validateAngularVersion() {
  const version = getPackageVersion('@angular/core')
  const { min, max } = SUPPORTED_ANGULAR_VERSIONS
  if (version < min) {
    throw new BeagleCliError(
      `You're using Angular ${version}. Minimum supported version is ${min}.`,
    )
  }
  if (version > max) {
    logWarning(`You're using Angular ${version}. Maximum supported version is ${max}.
      Please open an issue if you note something broke in this latest angular version.`)
  }
}

export function getAngularEngine(): AngularEngine {
  // todo
  return 'ViewEngine'
}

function getAngularJson(path: string) {
  try {
    return require(path)
  } catch {
    throw new BeagleCliError('Could not find your angular.json file!')
  }
}

function addFileReplacement(replacements: any[], replace: string, replaceWith: string) {
  const alreadyHasReplacement = replacements.some(replacement => replacement.replace === replace)
  if (!alreadyHasReplacement) {
    replacements.push({ replace, with: replaceWith })
    return true
  }
  return false
}

function createReplaceEntryForProject(
  project: Record<string, any>,
  replace: string,
  replaceWith: string,
) {
  if (!project?.architect?.build) return

  ensurePathExistence(project, 'architect.build.options.fileReplacements', [])
  const hasReplacedGlobal = addFileReplacement(
    project.architect.build.options.fileReplacements,
    replace,
    replaceWith,
  )

  const hasReplacedEnv: boolean[] = []
  getEnvironmentPaths(project, 'architect.build.configurations').forEach(path => {
    ensurePathExistence(project, `architect.build.configurations.${path}.fileReplacements`, [])
    hasReplacedEnv.push(addFileReplacement(
      project.architect.build.configurations[path].fileReplacements,
      replace,
      replaceWith,
    ))
  })

  return hasReplacedGlobal || hasReplacedEnv.some(value => value === true)
}

function createReplaceEntry(
  angularJson: Record<string, any>,
  replace: string,
  replaceWith: string,
) {
  const projects = Object.values(angularJson.projects) as Record<string, any>[]
  const hasChangedArray = projects.map(
    project => createReplaceEntryForProject(project, replace, replaceWith),
  )

  return hasChangedArray.some(value => value)
}

export function createAngularJsonEntries(beagleModulePath: string, outputPath: string) {
  const root = process.cwd()
  const path = `${root}/angular.json`
  const angularJson = getAngularJson(path)
  const hasChanged = createReplaceEntry(angularJson, beagleModulePath, outputPath)
  if (hasChanged) writeFileSync(path, JSON.stringify(angularJson, null, 2))
  return hasChanged
}
