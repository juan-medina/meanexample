// public/js/services/ListService.js

// create the list services
angular.module('ListService', []).factory('ListServices', ['$http', function($http) {

	return {
		// call to get all items in the list
		get : function(callback) {
			$http.get('/api/list').success(callback);
		},

		// call to POST and create a new item in the list
		create : function(name,callback) {
			return $http.post('/api/list',{ name: name}).success(callback);
		},

		// call to DELETE a item in the list
		delete : function(id,callback) {			
			return $http.delete('/api/list/' + id).success(callback);
		},
		
		// call to PUT and update item in the list
		update : function(id,name,callback) {
			return $http.put('/api/list/'+ id ,{ name: name}).success(callback);
		},		
				
	}		

}]);
