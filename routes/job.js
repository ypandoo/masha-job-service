var express = require('express')
var router = express.Router()
var Job = require('../models/job')

router.post('/add', function(req, res) {

  const areaId = req.body.area
  if (!areaId) {
    res.json({ error_code: 1, msg: 'areaId is empty' })
    return
  }
  const positionId = req.body.position
  if (!positionId) {
    res.json({ error_code: 1, msg: 'position is empty' })
    return
  }
  const companyId = req.body.company
  if (!companyId) {
    res.json({ error_code: 1, msg: 'company is empty' })
    return
  }

  const url = req.body.url
  if (!url) {
    res.json({ error_code: 1, msg: 'url is empty' })
    return
  }

  //const publish_date = req.body.publish_date
  // if (!publish_date) {
  //   res.json({ error_code: 1, msg: 'publish_date is empty' })
  //   return
  // }

  // const title = req.body.title
  // if (!title) {
  //   res.json({ error_code: 1, msg: 'title is empty' })
  //   return
  // }

  var job = new Job({
    title: "",
    url: url,
    publish_date: Date.now(),
    area: areaId,
    company: companyId,
    position: positionId
  })

  job.save(function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query Job failed', data: {}})
    }
  })
  //res.json({ error_code: 0, msg: 'success' })
})

router.post('/update', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  const url = req.body.url

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
  const type = req.body.type
  if (!type) {
    res.json({ error_code: 1, msg: 'type is empty' })
    return
  }
  const content = req.body.content
  if (!content) {
    res.json({ error_code: 1, msg: 'content is empty' })
    return
  }
  const author = req.body.author
  if (!author) {
    res.json({ error_code: 1, msg: 'author is empty' })
    return
  }
  const publish_date = req.body.publish_date
  if (!publish_date) {
    res.json({ error_code: 1, msg: 'publish_date is empty' })
    return
  }
  const cover_url = req.body.cover_url

  Job.findOneAndUpdate({ _id: id }, {
    title: title,
    desc: desc,
    url: url,
    content: content,
    author: author,
    publish_date: publish_date,
    cover_url: cover_url,
    type: type
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query Job failed', data: {}})
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

  var position = req.body.position
  var area = req.body.area
  var company = req.body.company
  var query = {deleted: false};
  if(typeof position != 'undefined' && position != ""){
    Object.assign(query, {position: position});
  }
  if(typeof area != 'undefined' && area != ""){
    Object.assign(query, {area: area});
  }
  if(typeof company != 'undefined' && company != ""){
    Object.assign(query, {company: company});
  }

  var options = {
    populate: ['area', 'company', 'position'],
    page: page, 
    limit: limit,
    sort: {publish_date: 'desc'},
  };

  Job.paginate(query, options, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query Job failed', data: {}})
    }
  })
})

router.post('/findOne', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  Job.findOne({ _id: id }, function(err, item) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', item: item })
    } else {
      res.json({ error_code: 1, msg: 'query one Job failed', item: {}})
    }
  })
})

router.post('/delete', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  Job.findOneAndUpdate({ _id: id }, {
    deleted: true,
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'delete Job failed', data: {}})
    }
  })
})

module.exports = router
