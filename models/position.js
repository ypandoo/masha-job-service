var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var _Position = new Schema({
  title: String,
  sort: { type: Number, default: 1 },
  deleted: {type: Boolean, default: false},
})

_Position.plugin(timestamps)
_Position.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Position', _Position)
