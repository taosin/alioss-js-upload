var path = require('path')
var express = require('express')
var ejs = require('ejs')

var port = "8188"

var app = express()
var service = require('./service.js')

// setCrossDomain (req,
 // res, next) {
//   res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since')
//   res.append('Access-Control-Allow-Credentials', 'true')
//   res.append('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE')
//   res.append('X-Powered-By', '3.2.1')
//   res.append('Content-Type', 'application/json;charset=utf-8')
//   next()
// }
// app.use(setCrossDomain)
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  // 获取token
  app.get('/alioss/getOssToken', function(req, res) {
    res.append('Access-Control-Allow-Origin', '*')
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