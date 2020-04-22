/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { writeFileSync } from 'fs'
import { execSync } from 'child_process'
import BeagleCliError from '../errors'

interface PackageScript {
  name: string,
  run: string,
}

export function getPackageJson(): Record<string, any> {
  const root = process.cwd()
  try {
    return require(`${root}/package.json`)
  } catch {
    throw new BeagleCliError('Could not find your package.json file!')
  }
}

function getDependency(packageName: string): string {
  const { devDependencies, peerDependencies, dependencies } = getPackageJson()
  const allDependencies = { ...devDependencies, ...peerDependencies, ...dependencies }
  return allDependencies[packageName]
}

export function getPackageVersion(packageName: string): number {
  const dependency = getDependency(packageName)
  if (!dependency) throw new BeagleCliError(`Couldn't find version for ${packageName}`)
  const cleanVersion = dependency.replace(/[^\.\d]/g, '')
  const [integer, ...decimals] = cleanVersion.split('.')
  const numberStr = `${integer}.${decimals.join('')}`
  return parseFloat(numberStr)
}

export function createPackageScripts(scripts: PackageScript[]) {
  const root = process.cwd()
  const packageJson = getPackageJson()
  packageJson.scripts = packageJson.scripts || {}
  scripts.forEach(({ name, run }) => packageJson.scripts[name] = run)
  writeFileSync(`${root}/package.json`, JSON.stringify(packageJson, null, 2))
}

export function addDependencies(dependencies: Record<string, string>, isDev: boolean) {
  const root = process.cwd()
  const packageJson = getPackageJson()
  const deps = isDev ? 'devDependencies' : 'dependencies'
  packageJson[deps] = {
    ...packageJson[deps],
    ...dependencies,
  }
  writeFileSync(`${root}/package.json`, JSON.stringify(packageJson, null, 2))
}

export function removeDependencies(dependencyNames: string[], isDev: boolean) {
  const root = process.cwd()
  const packageJson = getPackageJson()
  const dependencies = isDev ? packageJson.devDependencies : packageJson.dependencies
  dependencyNames.forEach(depName => delete dependencies[depName])
  writeFileSync(`${root}/package.json`, JSON.stringify(packageJson, null, 2))
}

export function install(isNpm: boolean) {
  execSync(isNpm ? 'npm install' : 'yarn')
}
