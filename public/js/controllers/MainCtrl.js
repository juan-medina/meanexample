// public/js/controllers/MainCtrl.js

	// main page controller
	angular.module('MainCtrl', []).controller('MainController', function($scope) {

	// add to the scope a tag line
	$scope.tagline = 'NodeJS - Express - MongoDB - AngularJS - Boostrap : for the win!';	

	//TODO: remove this to a different place 
	$(".btn").tooltip({
        placement : 'bottom',
        container : 'body'
    });
    
});