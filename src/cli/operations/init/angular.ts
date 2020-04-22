/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { writeFileSync } from 'fs'
import BeagleCliError from '../../errors'
import { AngularEngine } from '../../types'
import { ensurePathExistence } from '../../utils/object'
import { getPackageVersion } from '../../utils/packages'
import { logWarning } from '../../utils/styledLogger'

const SUPPORTED_ANGULAR_VERSIONS = { min: 6, max: 9.07 }

export function validateAngularVersion() {
  const version = getPackageVersion('@angular/core')
  const { min, max } = SUPPORTED_ANGULAR_VERSIONS
  if (version < min) {
    throw new BeagleCliError(
      `You're using Angular ${version}. Minimum supported version is ${min}.`
    )
  }
  if (version > max) {
    logWarning(`You're using Angular ${version}. Maximum supported version is ${max}. Please open an issue if you note something broke in this latest angular version.`)
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

  ensurePathExistence(project, 'architect.build.configurations.production.fileReplacements', [])
  const hasReplacedProduction = addFileReplacement(
    project.architect.build.configurations.production.fileReplacements,
    replace,
    replaceWith,
  )
  
  return hasReplacedGlobal || hasReplacedProduction
}

function createReplaceEntry(
  angularJson: Record<string, any>,
  replace: string,
  replaceWith: string,
) {
  const projects = Object.values(angularJson.projects)
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
