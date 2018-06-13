var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var _Category = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  desc: String,
  sort: { type: Number, default: 1 },
  url: String,
  show: {type: Boolean, default: true}
})

_Category.plugin(timestamps)
_Category.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Category', _Category)
