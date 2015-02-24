myApp.controller('CheckinsController', function($scope, $rootScope, $firebase, FIREBASE_URL, $routeParams, $location, $firebaseSimpleLogin){

$scope.whichmeeting = $routeParams.mId;
$scope.whichuser = $routeParams.uId;
$scope.order="firstname";
$scope.direction="";

var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins');

var checkinsList = $firebase(ref).$asArray();
$scope.checkins = checkinsList;

$scope.addCheckin = function(){
	var checkinsObj = $firebase(ref);

	var myData = {
		firstname: $scope.user.firstname,
		lastname: $scope.user.lastname,
		email: $scope.user.email,
		date: Firebase.ServerValue.TIMESTAMP
	};

	checkinsObj.$push(myData).then(function(){
		$location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
	});//data sent to firebase
}//add checkin

$scope.deleteCheckin = function(id){
	var record = $firebase(ref);
	record.$remove(id);
}//delete checkin

$scope.pickRandom = function(){
	var whichRecord = Math.round(Math.random() * checkinsList.length);
	$scope.recordId = checkinsList.$keyAt(whichRecord);
}//pick random

})//CheckinsController