var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var itemSchema = new Schema({
    name:  String
});
 
module.exports = mongoose.model('Item', itemSchema);