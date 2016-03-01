var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
	function($scope, $http) {
	console.log("Hello from controller!");

	// auto refresh the page
	var refresh = function() {
		$http.get('/contactList').success(function (response) {
			console.log("I got the data that I requested.");
			$scope.contactList = response;

			// to clear input box after calling function
			$scope.contact = "";
		});	
	};

	// call it to auto refresh
	refresh();

	$scope.addContact = function() {
		console.log($scope.contact);

		// send input data from box to server
		// (path, data)
		$http.post('/contactList', $scope.contact).success(function (response) {
			console.log(response);
			// refresh the page
			refresh();
		});
	};

	$scope.remove = function(id) {
		console.log(id);

		$http.delete('/contactList/' + id).success(function (response) {
			refresh();
		});
	};

	$scope.edit = function (id) {
		console.log(id);
		$http.get('/contactList/' + id).success(function (response) {
			// put the selected data that user want to edit to the input boxes
			$scope.contact = response;
		});
	};

	$scope.update = function() {
		// put id of the contact into console
		console.log($scope.contact._id);
		// send data to server
		$http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function (response) {
			refresh();
		});
	};

	$scope.deselect = function() {
		$scope.contact = "";
	}
}]);