const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  host_name: {
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
    type: String
  },
  is_wp_site:{
    type:Boolean,
    default:true
  },
  created_at: {
    select: false,
    type: Date,
    default: Date.now
  },
  updated_at: {
    select: true,
    type: Date,
    default: Date.now
  }
});

mongoose.model('site', schema);

module.exports = schema;
