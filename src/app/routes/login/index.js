angular
  .module('bi.base')
  .component('loginComponent', {
    templateUrl: './app/routes/login/el.html',
    controller: LoginController
  });

/** @ngInject */
function LoginController($state, BIAuthService, BIAuthEnv) {
  var vm = this;

  vm._goMainRoute = function () {
    if (angular.isDefined(BIAuthEnv.mainRoute.route) && angular.isDefined(BIAuthEnv.mainRoute.param)) {
      $state.go(BIAuthEnv.mainRoute.route, BIAuthEnv.mainRoute.param);
    } else {
      $state.go(BIAuthEnv.mainRoute);
    }
  };
  vm.submit = function () {
    BIAuthService.login(vm.user).then(vm._goMainRoute,
      function (data) {
        vm.error = angular.isString(data) ? data : true;
      }
    );
  };
  vm.$onInit = function () {
    BIAuthService.profile().then(this._goMainRoute);
    angular.extend(this, {
      error: undefined,
      user: {
        username: null,
        password: null
      }
    });
  };

  // vm.$onDestroy = function () {};
}
