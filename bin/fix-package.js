/* 
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

const fs = require('fs')
const path = require('path')

const DIST_PACKAGE = './dist/package.json'
const CONFIG_PATH = './lib-fix-package.json'

async function readJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, { encoding: 'utf8' })
    return JSON.parse(content)
  } catch (error) {
    console.error(error)
  }
}

function writeJSONToFile(data, filePath) {
  const content = JSON.stringify(data, null, 2)
  fs.writeFileSync(filePath, content)
}

function merge(target, source) {
  const keys = Object.keys(source)
  keys.forEach(key => {
    if (!target[key] || typeof source[key] !== 'object') target[key] = source[key]
    else if (source[key] instanceof Array) {
      target[key] = (target[key] instanceof Array) ? [...target[key], ...source[key]] : source[key]
    }
    else merge(target[key], source[key])
  })
}

async function start() {
  const package = await readJSON(DIST_PACKAGE)
  const alterations = await readJSON(CONFIG_PATH)
  merge(package, alterations)
  writeJSONToFile(package, DIST_PACKAGE)
  console.info(`Updated file "${DIST_PACKAGE}" with properties at "${CONFIG_PATH}"`)
}

start()
