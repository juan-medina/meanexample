// public/js/services/ListService.js
angular.module('ListService', []).factory('ListServices', ['$http', function($http) {

	return {
		// call to get all nerds
		get : function(callback) {
			$http.get('/api/list').success(callback);
		},

		// call to POST and create a new nerd
		create : function(name,callback) {
			return $http.post('/api/list',{ name: name}).success(callback);
		},

		// call to DELETE a nerd
		delete : function(id,callback) {			
			return $http.delete('/api/list/' + id).success(callback);
		},
		
		// call to PUT and update a nerd
		update : function(id,name,callback) {
			return $http.put('/api/list/'+ id ,{ name: name}).success(callback);
		},		
				
	}		

}]);
