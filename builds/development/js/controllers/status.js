myApp.controller('StatusController', function($scope, $rootScope, $firebaseSimpleLogin, $location, Authentication, $firebase, FIREBASE_URL){

	$scope.logout = function(){
		Authentication.logout();
		$location.path('/login');
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser){
		var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
		var user = $firebase(ref).$asObject();

		user.$loaded().then(function(){
			$rootScope.currentUser = user;
		});
	});//$firebaseSimpleLogin:Login

	$rootScope.$on('$firebaseSimpleLogin:logout', function(e, authUser){
		$rootScope.currentUser = null;
	});//$firebaseSimpleLogin:Logout

})//StatusController