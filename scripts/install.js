#!/usr/bin/env node
'use strict';
const fs = require('fs-extra')
const path = require('path')
const spawn = require('child_process').spawnSync
const codeshift = require('jscodeshift/dist/Runner');

const tmplDir = path.join(__dirname, '../')
const wd = process.cwd()
const files = fs.readdirSync(tmplDir)
const pkg = require(path.join(wd,'package.json'))

console.log(`Building template for ${pkg.name}...`)
files.filter(file=>file.endsWith('.js'))
.forEach(file=>{
  fs.copySync(
    path.join(tmplDir, file),
    path.join(wd, file)
  )
})

fs.copySync(
  path.join(tmplDir, 'github'),
  path.join(wd, 'github')
)

console.log("codeshifting..")
codeshift
  .run(path.join(tmplDir, 'scripts/transform.js') , ['app.js'], { appname: pkg.name })
  .then(function() {
    console.log("done!")
  }, function(err) {
    console.log("error: codeshift failed:", err.message)
  })
