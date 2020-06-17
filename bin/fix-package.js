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

const fs = require('fs')
const path = require('path')

const DIST_PACKAGE = './.dist/package.json'
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
