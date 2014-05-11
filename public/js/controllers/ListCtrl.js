// public/js/controllers/ListCtrl.js

// list controller module
angular.module('ListCtrl', []).controller('ListController', function($scope, ListServices) {

// INIT
	//TODO: remove this to a different place 
	$("button.btn").tooltip({
        placement : 'top',
        container : 'body'
    });
	
	//add to the scope the tag line
	$scope.tagline = 'Inline edit of a list stored in MongoDB!';

	//get the list
	ListServices.get(function(results) {
		$scope.list = results;		
	});

	//clear alert and messages
	$scope.showAlert = false;
	$scope.showMessage = false;
	
// OPERATIONS

	//refresh the list
	$scope.refresh = function(){
	
		//clear alert and messages
		$scope.showAlert = false;
		$scope.showMessage = false;
		
		//get the list and display a message
		ListServices.get(function(results) {
			$scope.list = results;

			$scope.showMessage = true;
			$scope.message = "Data refreshed";				
			
		});
				
	}
	
	//click on edit a item
	$scope.editItem = function(item) {		
		
		//clear alert and messages
		$scope.showAlert = false;
		$scope.showMessage = false;				
				
		//flag the item as editing
		item.onEdit = true;	
		
		//store current name
		item.oldName = item.name.toString();
				
	}
	
	//click on undo in a editing item or a new item
	$scope.undoEditItem = function(item) {
		
		//clear alert and messages
		$scope.showAlert = false;
		$scope.showMessage = false;

		//if we are creating the item				
		if(item.newItem){
			
			//fin the item and remove it from the list
			for (i in $scope.list) {
				if ($scope.list[i]._id == item._id) {
					$scope.list.splice(i, 1);
					break;
				}
			}
							
		} else {
			
			//remove edit flag and restore name
			item.onEdit = false;	
			item.name = item.oldName;
			
		}								
	}	
	
	//create a new item for editing
	$scope.addItem = function() {
		
		//clear alert and messages
		$scope.showAlert = false;
		$scope.showMessage = false;
		
		//create the object
		item = new Object();
		
		//flag as a new item
		item.newItem = true;
		
		//generate a random id and name
		item.id = "new" + new Date().getTime();
		item.name = item.id;
		
		//flag as editing
		item.onEdit = true;
		
		//push the item in the list
		$scope.list.push(item);
	}

	//save a editing or new item
	$scope.saveItem = function(item) {
		
		//clear alert and messages
		$scope.showAlert = false;
		$scope.showMessage = false;
		
		//if we dont have a name display and error
		if(!item.name){
		
			$scope.showAlert = true;
			$scope.alert = "Name could not be empty";									
				
		}else{		
			
			//clear alert and messages
			$scope.showAlert = false;
			$scope.showMessage = false;
					
			//if the item is new create it	
			if(item.newItem){
				
				//call create service and handle error
				ListServices.create (item.name,function(results) {
	
					if (results.error) {
						$scope.showAlert = true;
						$scope.alert = results.message;
					} else {
							
						//get the real id for the item
						item._id = results.id;
						
						//unflag new item and editing
						item.newItem = false;						
						item.onEdit = false;
										
						//display the message
						$scope.showMessage = true;
						$scope.message = results.message;
										
					}
						
				});					
				
			}else{
				
				//clear alert and messages
				$scope.showAlert = false;
				$scope.showMessage = false;				
			
				//update item and handle error
				ListServices.update (item._id,item.name,function(results) {
	
					if (results.error) {
						$scope.showAlert = true;
						$scope.alert = results.message;
					} else {						
						
						//unflag editing
						item.onEdit = false;
										
						//display the message	
						$scope.showMessage = true;
						$scope.message = results.message;
										
					}
						
				});		
			
			}										
		}		 		
				
	}	
			
	//delete a item		
	$scope.deleteItem = function(item) {
		
		//clear alert and messages
		$scope.showAlert = false;
		$scope.showMessage = false;

		//delete the item and handle erros
		ListServices.delete (item._id,function(results) {
			

			if (results.error) {
				$scope.showAlert = true;
				$scope.alert = results.message;
			} else {

				//display the message
				$scope.showMessage = true;
				$scope.message = results.message;
				
				//remove the item from the list
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
