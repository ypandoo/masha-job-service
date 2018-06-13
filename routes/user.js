var express = require('express')
var router = express.Router()

router.post('/login', function(req, res) {
  res.json({
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  })
})

router.get('/info', function(req, res) {
  res.json({
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  })
})

router.post('/logout', function(req, res) {
  res.json({
  })
})

module.exports = router
