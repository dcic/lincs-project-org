// Login, logout etc
var mod = angular.module("Auth", ["ngFlash"]);

mod.controller("LoginCtrl", ["$scope", "authentic", "Flash", function($scope, authentic, flash) {
	// console.log(authentic);

	$scope.login = function() {
		$scope.error = false;
		$scope.disables = true;

		// Try to login using the authentication service, which rejects the
		// promise if wrong user information are tried.
		authentic.login($scope.loginForm.email, $scope.loginForm.password)
			// handle successful promise
			.then(function() {})
			// handle error
			.catch(function(result) {
				$scope.alert(result.message);
			});
	}

	$scope.alert = function(message) {
		flash.create("danger", message, 8000);
	};
}]);

// Authentication provider, which can be used in .config of routes.
// The use of Angular provider enables the services to be used in .config
// for front-end routing behaviour that depends on the authentication status.
mod.provider("authentic", function () {
	// This function can be called in Angular configuration blocks (.config)
	this.resolver = function() {
		return true;
	}

	// The service. Get is used by Angular to construct the service instance.
	this.$get = ["$q", "$http", "$location", function($q, $http, $location) {
		// service instance containing functions
		return {
			// isLoggedIn() checks whether the user is authorized by submitting a GET request
			isLoggedIn: function() {
				// Promise assessing whether the user is logged in
				var deferred = $q.defer();

				// Request authentication status through GET request
				$http.get("auth")
					.success(function(logged_on) {
						if (logged_on) {
							// the user is authorized
							deferred.resolve();
						} else {
							// unauthorized
							deferred.reject();
							$location.url("login");  // redirect to login page
						}
					});
				// console.log(deferred.promise);
				return deferred.promise;  // return the promise
			},
			// login() requests the server for login with the provided email and password
			login: function(email, password) {
				// console.log("login(), email: ", email, " pw: ", password);
				var deferred = $q.defer();  // contais promise to be returned

				// login request
				$http.post("auth/login", {email: email, password: password})
					.success(function(data, status) {

						if (status === 200) {
							// console.log(data);
							deferred.resolve(data);  // resolve promise and send data from POST request
							$location.url("/");  // go to landing page
						} else {
							deferred.reject(data);
						}
					})
					// error handling
					.error(function(err) {
						deferred.reject(err);
					});

				return deferred.promise;
			}
		}  // end of return object
	}];
});
