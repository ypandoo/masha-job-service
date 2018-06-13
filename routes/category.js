var express = require('express')
var router = express.Router()
var Category = require('../models/category')

router.post('/add', function(req, res) {
  const url = req.body.url
  if (!url) {
    res.json({ error_code: 1, msg: 'url is empty' })
    return
  }
  const desc = req.body.desc
  if (!desc) {
    res.json({ error_code: 1, msg: 'desc is empty' })
    return
  }
  const title = req.body.title
  if (!title) {
    res.json({ error_code: 1, msg: 'title is empty' })
    return
  }
  const sort = req.body.sort
  if (!sort) {
    res.json({ error_code: 1, msg: 'sort is empty' })
    return
  }

  var category = new Category({
    title: title,
    desc: desc,
    url: url,
    sort: sort
  })
  category.save()
  res.json({ error_code: 0, msg: 'success' })
})

router.post('/update', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  const url = req.body.url
  if (!url) {
    res.json({ error_code: 1, msg: 'url is empty' })
    return
  }
  const desc = req.body.desc
  if (!desc) {
    res.json({ error_code: 1, msg: 'desc is empty' })
    return
  }
  const title = req.body.title
  if (!title) {
    res.json({ error_code: 1, msg: 'title is empty' })
    return
  }
  const sort = req.body.sort
  if (!sort) {
    res.json({ error_code: 1, msg: 'sort is empty' })
    return
  }

  Category.findOneAndUpdate({ _id: id }, {
    title: title,
    desc: desc,
    url: url,
    sort: sort
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query category failed', data: {}})
    }
  })
})

router.post('/list', function(req, res) {
  var limit = req.body.limit
  if (!limit) {
    limit = 20
  }
  var page = req.body.page
  if (!page) {
    page = 1
  }

  var show = req.body.show
  var query = {}
  if( show === true){
    query.show = true
  }

  Category.paginate(query, { sort: {sort: 'desc'}, page: page, limit: limit }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query category failed', data: {}})
    }
  })
})

router.post('/findOne', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  Category.findOne({ _id: id }, function(err, item) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', item: item })
    } else {
      res.json({ error_code: 1, msg: 'query one category failed', item: {}})
    }
  })
})

router.post('/show', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  var show = req.body.show
  if (!show) 
    show = false

  Category.findOneAndUpdate({ _id: id }, {
    show: show,
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'change show status of category failed'})
    }
  })
})

module.exports = router
