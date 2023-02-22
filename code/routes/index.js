'use strict'

const path = require('path')

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
  })

  // Put additionanl paths between here; do not need to add js or css paths here

  app.get('*', (req, res) => {
    console.log('in * catch all to return ' + path.join(__dirname, '../index.html'))
    res.sendFile(path.join(__dirname, '../index.html'))
  })
}
