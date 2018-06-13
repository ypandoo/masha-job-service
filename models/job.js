var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var _Job = new Schema({
  id: Schema.Types.ObjectId,
  title: String,
  url: String,
  publish_date:{type: Date, default: Date.now},
  sort: { type: Number, default: 1 },
  deleted: {type: Boolean, default: false},
  area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'},
  position: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
  company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'}

})

_Job.plugin(timestamps)
_Job.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Job', _Job)
