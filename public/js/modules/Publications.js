var mod = angular.module("Publications", ["mgcrea.ngStrap.tooltip"]);

mod.controller("PublicationsCtrl", ["$scope", "$http", function($scope, $http) {
	// console.log("Publication ctrl.");
	// Retrieve the publications
	$scope.publications = [];  // publication data

	// order and specification of category names for the publication table
	$scope.categories = ["assay-development", "data-analysis", "data-generation", "data-integration",
		"data-standards", "signature-generation", "software-development", "review"];

	$scope.assay_tooltip = "Assay development";

	$scope.tooltips = {
		"assay-development": "Assay development",
		"data-analysis": "Data analysis",
		"data-generation": "Data generation",
		"data-integration": "Data integration",
		"data-standards": "Data standards",
		"signature-generation": "Signature generation",
		"software-development": "Software development",
		"review": "Litterature review"
	};

	$http.get("/api/publications")
		.success(function(data) {
			$scope.publications = data;
		})
		.error(function(data) {
			console.log("Error: ", data);
		});
	
}]);