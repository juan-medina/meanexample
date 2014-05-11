// app/api.js

//item model
var Item = require('./models/item.js');

//list all items
exports.listItems = function(req, res) {

	//get the list and check for erros
	Item.find(function(err, list) {
		if (err) {
			res.send(err);
		} else {
			res.send(list);
		}
	});

}
//create a new item
exports.postItem = function(req, res) {

	// create a new instance of the model
	var item = new Item();

	// set the name (comes from the request)
	item.name = req.body.name;

	// save the item and check for errors, return the id if created
	item.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json({
				message : 'Item created!',
				error : false,
				id : item._id
			});
		}
	});

}
//deletea item
exports.deleteItem = function(req, res) {

	//found flag
	var found = false;

	//search for the item and check for errors
	Item.findById(req.params.id, function(err, item) {
		if (err) {
			res.send(err);
		} else {

			//if we dont found it return a error
			found = item != null;

			if (!found) {
				res.json({
					message : 'Item not found',
					error : true
				});
			} else {

				//remove the item from the db and check for errors
				Item.remove({
					_id : req.params.id
				}, function(err, item) {

					if (err) {
						res.send(item);
					} else {
						res.json({
							message : 'Item deleted',
							error : false
						});
					}

				});
			}
		}

	});

}
//update a item
exports.updateItem = function(req, res) {

	//found flag
	var found = false;

	//search for the item and check for errors
	Item.findById(req.params.id, function(err, item) {

		if (err) {
			res.send(err);
		} else {

			//if we dont found it return a error
			found = item != null;

			if (!found) {
				res.json({
					message : 'Item not found',
					error : true
				});
			} else {

				item.name = req.body.name;

				// save the item
				item.save(function(err) {
					if (err) {
						res.send(err);
					} else {
						res.json({
							message : 'Item updated',
							error : false
						});
					}

				});

			}
		}

	});

}

