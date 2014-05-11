 // app/routes.js

	// set up the RESTful API, handler methods are defined in api.js
	var api = require('./api.js');
	
	module.exports = function(app) {

		// server routes ===========================================================
		// handle things like api calls
		// authentication routes
		
		// api routes
		app.get('/api/list', api.listItems);
		app.post('/api/list', api.postItem);
		app.delete('/api/list/:id', api.deleteItem);
		app.put('/api/list/:id', api.updateItem);

		

		// frontend routes =========================================================
		// route to handle all angular requests
		app.get('*', function(req, res) {
			res.sendfile('./public/index.html'); // load our public/index.html file
		});

	};