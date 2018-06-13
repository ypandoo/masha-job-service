var mongoose = require('mongoose')

var Schema = mongoose.Schema
var timestamps = require('mongoose-timestamp')
var mongoosePaginate = require('mongoose-paginate');

// Define User schema
var Area = new Schema({
  title: String,
  sort: { type: Number, default: 1 },
  deleted: {type: Boolean, default: false},
})

Area.plugin(timestamps)
Area.plugin(mongoosePaginate)

// export them
module.exports = mongoose.model('Area', Area)
