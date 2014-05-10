// public/js/appRoutes.js
	angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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

	$locationProvider.html5Mode(true);

}]);