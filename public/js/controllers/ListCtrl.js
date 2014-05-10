// public/js/controllers/ListCtrl.js
angular.module('ListCtrl', []).controller('ListController', function($scope, ListServices) {

	$("button.btn").tooltip({
        placement : 'top',
        container : 'body'
    });
	
	$scope.tagline = 'Inline edit of a list stored in MongoDB!';

	ListServices.get(function(results) {
		$scope.list = results;		
	});

	$scope.showAlert = false;
	$scope.showMessage = false;
	
	$scope.refresh = function(){
	
		$scope.showAlert = false;
		$scope.showMessage = false;
		
		ListServices.get(function(results) {
			$scope.list = results;

			$scope.showMessage = true;
			$scope.message = "Data refreshed";				
			
		});
		
		
	}
	
	$scope.editItem = function(item) {		
		
		
		$scope.showAlert = false;
		$scope.showMessage = false;				
				
		item.onEdit = true;	
		item.oldName = item.name.toString();
				
	}
	
	$scope.undoEditItem = function(item) {
		
		$scope.showAlert = false;
		$scope.showMessage = false;
				
		if(item.newItem){
			
			for (i in $scope.list) {
				if ($scope.list[i]._id == item._id) {
					$scope.list.splice(i, 1);
					break;
				}
			}
							
		} else {
			
			item.onEdit = false;	
			item.name = item.oldName;
			
		}								
	}	
	
	$scope.addItem = function() {
		
		$scope.showAlert = false;
		$scope.showMessage = false;
		
		item = new Object();
		
		item.newItem = true;
		item.id = "new" + new Date().getTime();
		item.name = item.id;
		item.onEdit = true;
		
		$scope.list.push(item);
	}

	$scope.saveItem = function(item) {
		
		$scope.showAlert = false;
		$scope.showMessage = false;
		
		if(!item.name){
		
			$scope.showAlert = true;
			$scope.alert = "Name could not be empty";									
				
		}else{		
			
			$scope.showAlert = false;
			$scope.showMessage = false;
						
			if(item.newItem){
				
				ListServices.create (item.name,function(results) {
	
					if (results.error) {
						$scope.showAlert = true;
						$scope.alert = results.message;
					} else {
							
						item._id = results.id;
						item.newItem = false;
										
						$scope.showMessage = true;
						$scope.message = results.message;
						item.onEdit = false;				
					}
						
				});					
				
			}else{
				
				$scope.showAlert = false;
				$scope.showMessage = false;				
			
				ListServices.update (item._id,item.name,function(results) {
	
					if (results.error) {
						$scope.showAlert = true;
						$scope.alert = results.message;
					} else {						
											
						$scope.showMessage = true;
						$scope.message = results.message;
						item.onEdit = false;				
					}
						
				});		
			
			}										
		}		 		
				
	}	
			
		
	$scope.deleteItem = function(item) {
		
		$scope.showAlert = false;
		$scope.showMessage = false;

		ListServices.delete (item._id,function(results) {
			

			if (results.error) {
				$scope.showAlert = true;
				$scope.alert = results.message;
			} else {

				$scope.showMessage = true;
				$scope.message = results.message;
				
				for (i in $scope.list) {
					if ($scope.list[i]._id == item._id) {
						$scope.list.splice(i, 1);
						break;
					}
				}
			}

		});

	}
});
