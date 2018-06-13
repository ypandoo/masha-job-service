var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var Company = new Schema({
  title: String,
  sort: { type: Number, default: 1 },
  deleted: {type: Boolean, default: false},
  area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'}
})

Company.plugin(timestamps)
Company.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Company', Company)
