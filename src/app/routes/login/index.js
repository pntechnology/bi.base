angular
  .module('bi.base')
  .component('loginComponent', {
    templateUrl: './app/routes/login/el.html',
    controller: LoginController
  });

/** @ngInject */
/* eslint-disable max-params */
function LoginController($state, BIAuthService, BIAuthEnv, $location, $window, $rootScope, BIEvents) {
  var vm = this;
  vm.optIn = false;
  vm.showDatenschutz = function () {
    $rootScope.$broadcast(BIEvents.SHOW_COMPONENT, {type: 'dse'});
  };
  var goMainRoute = function () {
    if (angular.isDefined($location.search().next)) {
      $window.location.assign($location.search().next);
    } else if (angular.isDefined(BIAuthEnv.mainRoute.route) && angular.isDefined(BIAuthEnv.mainRoute.param)) {
      $state.go(BIAuthEnv.mainRoute.route, BIAuthEnv.mainRoute.param);
    } else {
      $state.go(BIAuthEnv.mainRoute);
    }
  };
  vm.onOptInClick = function () {
    var now = new Date();
    var date = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()));
    BIAuthService.optIn(
      {
        _id: vm.user._id,
        opt_in: date
      }
    ).then(goMainRoute)
  };
  var checkProfile = function (profile) { 
    if (profile.opt_in == null) {
      //vm.user._id = profile._id
      vm.user = Object.assign(vm.user, profile)
      vm.optIn = true;
    } else {
      goMainRoute()
    }        
  }
  vm.submit = function () {
    BIAuthService.login(vm.user).then(function () { 
      BIAuthService.profile().then(checkProfile);
    },
      function (data) {
        vm.error = angular.isString(data) ? data : true;
      }
    );
  };
  vm.$onInit = function () {
    BIAuthService.profile().then(
      checkProfile,
      function (err) {
        vm.error = angular.isString(data) ? data : true;
        vm.ready = true;
    });
    angular.extend(vm, {
      error: undefined,
      user: {
        username: null,
        password: null
      }
    });
  };

  // Vm.$onDestroy = function () {};
}