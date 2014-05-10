var Item = require('./models/item.js');

exports.listItems = function(req, res) {
	Item.find(function(err, list) {
		res.send(list);
	});
}

exports.postItem = function(req, res) {

	// create a new instance of the model
	var item = new Item();
	
	// set the name (comes from the request)
	item.name = req.body.name;
	

	// save the item and check for errors
	item.save(function(err) {
		if (err)
			res.send(err);

		res.json({
			message : 'Item created!',
			error : false,
			id : item._id
		});
	});

}

exports.deleteItem = function(req, res) {
	var found = false;

	Item.findById(req.params.id, function(err, item) {
		
		if (err)
			res.send(err);
			
		found = item != null;

		if (!found) {
			res.json({
				message : 'Item not found',
				error : true
			});
		} else {

			Item.remove({
				_id : req.params.id
			}, function(err, item) {
				if (err)
					res.send(item);

				res.json({
					message : 'Item deleted',
					error : false
				});
			});

		}

	});

}

exports.updateItem = function(req, res) {
	var found = false;

	Item.findById(req.params.id, function(err, item) {
		
		if (err)
			res.send(err);
			
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
				if (err)
					res.send(err);

				res.json({
					message : 'Item updated',
					error : false
				});

			});			

		}

	});

}

