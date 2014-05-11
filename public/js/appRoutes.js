// public/js/appRoutes.js

// create the router module
	angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	// define the routes
	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		// list page that will use the ListController
		.when('/list', {
			templateUrl: 'views/list.html',
			controller: 'ListController'
		})

	// set html5 mode
	$locationProvider.html5Mode(true);

}]);