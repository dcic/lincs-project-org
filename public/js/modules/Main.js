// Main module for the Lincs front end Angular application
var mod = angular.module("Main", []);

mod.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
	$scope.greeting = "Hrej from Angular";

	// Get data
	$http.get("api/todos")
		.success(function() {
			// console.log(data);
		})
		.error(function() {
			// console.log("Error: ", data);
		});
}]);
