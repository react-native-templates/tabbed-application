#!/usr/bin/env node
'use strict'
const fs = require('fs-extra')
const path = require('path')

const tmplDir = path.join(__dirname, '../')
const wd = process.cwd()
const files = fs.readdirSync(tmplDir)
const dirname = wd.split('/').pop()

console.log('copying template...')
files.filter((file) => file.endsWith('.js'))
.forEach((file) => {
  fs.copySync(
    path.join(tmplDir, file),
    path.join(wd, file)
  )
})

fs.copySync(
  path.join(tmplDir, 'github'),
  path.join(wd, 'github')
)

fs.readFile(`${wd}/index.ios.js`, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  var result = data.replace(/TabbedApplication/g, dirname)

  fs.writeFile(`${wd}/index.ios.js`, result, 'utf8', function (err) {
    if (err) return console.log(err)
  })
})

console.log('done!')
