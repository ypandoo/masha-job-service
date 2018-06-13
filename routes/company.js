var express = require('express')
var router = express.Router()
var Company = require('../models/company')
var Area = require('../models/area')

router.post('/addByAreaName', function(req, res) {
  const companies = req.body.companies
  if (!companies || companies.length == 0) {
    res.json({ error_code: 1, msg: 'companies is empty' })
    return
  }

  const area = req.body.area
  Area.findOne({ title: area }, function(err, item) {
    if(item){
      const areaId = item._id
      for(let index in companies){
        const title = companies[index].title
        Company.findOne({ title: title }, function(err, item) {
          if ( item != null ||item != undefined ) {
            //company alreay exists do nothing
            console.log('company alreay exists do nothing:')
            console.log(item)
          } else {
            
            var company = new Company({
              title: title,
              area: areaId
            })
        
            company.save(function(err, docs) {
              if (!err) {
                console.log('company insert success:')
                console.log(docs)
              } else {
                console.log('save company failed')
              }
            })
          }
        })
      }

      res.json({ error_code: 0, msg: 'success' })

    }else{
      res.json({ error_code: 1, msg: 'can not find related area' })
    }
  })

})


router.post('/add', function(req, res) {
  const companies = req.body.companies
  if (!companies || companies.length == 0) {
    res.json({ error_code: 1, msg: 'companies is empty' })
    return
  }

  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }

  for(let index in companies){
    const title = companies[index].title
    Company.findOne({ title: title, area: id }, function(err, item) {
      if ( item != null ||item != undefined ) {
        //company alreay exists do nothing
        console.log('company alreay exists do nothing:)')
        console.log(item)
      } else {
        
        var company = new Company({
          title: title,
          area: id
        })
    
        company.save(function(err, docs) {
          if (!err) {
            console.log('company insert success:')
            console.log(docs)
          } else {
            console.log('save company failed')
          }
        })
      }
    })
  }

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

  Company.findOneAndUpdate({ _id: id }, {
    title: title,
    desc: desc,
    url: url,
    sort: sort
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'query company failed', data: {}})
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

  var area = req.body.area
  var query = {deleted: false};
  if(typeof area != 'undefined' && area != ""){
    Object.assign(query, {area: area});
  }
  
  Company.paginate(query, { sort: {sort: 'desc'}, page: page, limit: limit }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', items: docs.docs, total: docs.total, page: docs.page, pages: docs.pages })
    } else {
      res.json({ error_code: 1, msg: 'query company failed', data: {}})
    }
  })
})

router.post('/findOne', function(req, res) {
  const id = req.body.id
  if (!id) {
    res.json({ error_code: 1, msg: 'id is empty' })
    return
  }
  Company.findOne({ _id: id }, function(err, item) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success', item: item })
    } else {
      res.json({ error_code: 1, msg: 'query one company failed', item: {}})
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

  Company.findOneAndUpdate({ _id: id }, {
    show: show,
  }, function(err, docs) {
    if (!err) {
      res.json({ error_code: 0, msg: 'success' })
    } else {
      res.json({ error_code: 1, msg: 'change show status of company failed'})
    }
  })
})

module.exports = router
