var path = require('path')
var express = require('express')
var ejs = require('ejs')

var port = "8188"

var app = express()
var service = require('./service.js')
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  // 获取token
  app.get('/alioss/getOssToken', function(req, res) {
    const result = service.getOssToken(req, res)
    if (result) {
      res.json({
        code: 100,
        data: result
      })
    }
  })

  console.log('Listening at http://localhost:' + port + '\n')
})
