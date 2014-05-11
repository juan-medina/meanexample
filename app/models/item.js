// models/item.js

//get mongo schema
var mongoose 	= require('mongoose')
  , Schema 		= mongoose.Schema;
 
//define the schema for a item
var itemSchema = new Schema({
	name:  String
});

//export our model as Item
module.exports = mongoose.model('Item', itemSchema);