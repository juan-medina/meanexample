// public/js/controllers/MainCtrl.js

	// main page controller
	angular.module('MainCtrl', []).controller('MainController', function($scope) {

	// add to the scope a tag line
	$scope.tagline = '<b>M</b>ongoDB - <b>E</b>xpress - <b>A</b>ngularJS - <b>N</b>odeJS';	

	//TODO: remove this to a different place 
	$(".btn").tooltip({
        placement : 'bottom',
        container : 'body'
    });
    
});