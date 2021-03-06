/**
 * Current user data service within this you can access to currently signed in user data.
 * Note that if you wanna be secure about this you have to also use 'Auth' service in your
 * views.
 *
 * Usage example in controller:
 *  angular
 *    .module('app')
 *    .controller('SomeController',[
 *      '$scope', 'AuthService', 'UserService',
 *      function controller($scope, AuthService, UserService) {
 *        $scope.auth = AuthService;
 *        $scope.user = UserService.user;
 *      }
 *    ])
 *  ;
 *
 * Usage example in view:
 *  <div data-ng-show="auth.isAuthenticated()">
 *      Hello, <strong>{{user().email}}</strong>
 *  </div>
 *
 * Happy coding!
 */
(function() {
  'use strict';

  angular.module('frontend.core.auth.services')
    .factory('UserService', [
        '_','$localStorage','$rootScope',
      function factory(_,$localStorage,$rootScope) {

          function user() {
              return $localStorage.credentials ? $localStorage.credentials.user : {};
          }

          function updateUser(user,keepNode) {

              var existingUser = $localStorage.credentials ? $localStorage.credentials.user : {};

              // Only update localStorage if user is the same
              if(existingUser.id == user.id) {
                  if(keepNode) {
                      user.node =$localStorage.credentials.user.node // Retain user node
                  }
                  $localStorage.credentials.user = user;
                  $rootScope.$broadcast('user.updated',$localStorage.credentials.user)
              }
          }

        return {
            user: user,
            updateUser : updateUser
        };
      }
    ])
  ;
}());
