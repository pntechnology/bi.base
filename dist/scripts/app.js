function ResetPasswordController(e,n,t){var o=this;o.user={password_code:t.code,password:void 0},o.submit=function(){e.reset(this.user).then(function(){n.go("login")},function(e){o.error=e})}}function LoginController(e,n,t,o,r){var i=this,a=function(){angular.isDefined(o.search().next)?r.location.assign(o.search().next):angular.isDefined(t.mainRoute.route)&&angular.isDefined(t.mainRoute.param)?e.go(t.mainRoute.route,t.mainRoute.param):e.go(t.mainRoute)};i.submit=function(){n.login(i.user).then(a,function(e){i.error=!angular.isString(e)||e})},i.$onInit=function(){n.profile().then(a,function(){i.ready=!0}),angular.extend(i,{error:void 0,user:{username:null,password:null}})}}function ForgotPasswordController(e){var n=this;n.user={email:""},n.submit=function(){e.reset(n.user).then(function(){n.error=void 0,n.success={success:!0,message:"Eine Email mit einem Link zum zurücksetzen ihres Passwortes wurde an folgende Adresse geschickt: \n\n"+n.user.email+"."}},function(e){n.error=e.email+"."})}}function ForbiddenController(e,n,t,o,r){var i=this,a=function(){angular.isDefined(o.search().next)?r.location.assign(o.search().next):angular.isDefined(t.mainRoute.route)&&angular.isDefined(t.mainRoute.param)?e.go(t.mainRoute.route,t.mainRoute.param):e.go(t.mainRoute)};i.submit=function(){n.login(i.user).then(a,function(e){i.error=!angular.isString(e)||e})}}function BIAuthService(e,n,t){var o=e.basePath,r={login:o+"/login2",logout:o+"/logout",reset:o+"/reset",profile:o+"/profile",user:o+"/user",info:o+"/info"},i={isAuthenticated:!1},a=function(e){if(Object.prototype.hasOwnProperty.call(e,"message"))return e;for(var n=0;n<Object.keys(e).length;n++)if(angular.isObject(e[Object.keys(e)[n]])){var t=a(e[Object.keys(e)[n]]);if(null!==t)return t}return null},s=function(e){var t=a(e).message;return null===t?n.reject(this.BIAuthEnv.unknown):n.reject(t)},l=function(e){return e.data.result};this.info=function(){return t({method:"GET",url:r.info}).then(l,s)},this.updatePassword=function(e){return angular.isDefined(e.password)?t({method:"PUT",data:e,url:r.user}).then(l,s):n.reject("Please set a password")},this.reset=function(e){return angular.isDefined(e.password_code)?t({method:"POST",data:e,url:r.reset}).then(l,s):t({method:"GET",url:r.reset+"?email="+e.email}).then(l,s)},this.profile=function(e){return i.isAuthenticated&&!e?n.when(i):t({method:"GET",url:r.profile}).then(function(e){return i=angular.extend(e.data.result,{isAuthenticated:!0})},s)},this.logout=function(){return i={isAuthenticated:!1},t({method:"GET",url:r.logout}).then(l,s)},this.login=function(e){return t({method:"POST",url:r.login,data:e}).then(function(){return this.profile(!0)}.bind(this),s)}}function run(e,n,t,o,r,i,a){angular.isUndefined(e.mainRoute)&&n.error("Please define the main route of the application in index/config.js !!!");var s=o.$on(r.UNAUTHORIZED,function(e,n){const o=angular.isDefined(n)?{next:n}:null;t.get("$state").go("login",o,{notify:!1}).then(a.location.reload)}),l=o.$on(r.FORBIDDEN,function(e,n){t.get("$state").go("forbidden")});try{t.get("$state").defaultErrorHandler(angular.noop)}catch(e){}var d=function(e){var n=i.alert({clickOutsideToClose:!0,escapeToClose:!0,title:"Fehler",textContent:angular.toJson(e),ok:"OK"});i.show(n).finally(function(){n=void 0})},u=o.$on(r.ERROR,function(e,n){d(n)});o.$on("$destroy",function(){s(),u(),l()}),n.debug("PNBI.BASE - visit:","https://gist.github.com/marekmru/")}function routes(e,n,t,o){o.enabled(!1),e.state("login",{url:"/?next",component:"loginComponent"}).state("forgot-password",{url:"/forgot-password",component:"forgotPasswordComponent"}).state("reset",{url:"/reset/:code",component:"resetPasswordComponent"}).state("forbidden",{url:"/forbidden",component:"forbiddenComponent"}),n.html5Mode(!1).hashPrefix(""),t.otherwise("/")}function NavbarController(e,n,t,o,r,i,a){var s,l,d=this;d.hideLoader=!0,d.toggleMenu=function(){e("md-sidenav-left").toggle()},d.goMainRoute=function(){angular.isDefined(t.mainRoute.route)&&angular.isDefined(t.mainRoute.param)?r.go(t.mainRoute.route,t.mainRoute.param):r.go(t.mainRoute)},d.logout=function(){o.logout().then(function(){r.go("login",null,{notify:!1,reload:!0}).then(function(){location.reload()})})},d.onLoad=function(e,n){d.hideLoader=!n},d.$onInit=function(){l=i.$on("BI.EVENTS.LOAD",d.onLoad),d.vis=!0,d.profile=void 0;var r=t.noAuthRoutes;s=n.onStart({},function(n){e("md-sidenav-left").close(),d.currentState=n.to().name;var t=-1===r.indexOf(d.currentState);d.vis=t,angular.isUndefined(d.profile)&&o.profile().then(function(e){d.profile=e},function(){d.profile=void 0})})},d.$onDestroy=function(){s(),l()}}function mdtheme(e){var n={50:"#fae2e3",100:"#f3b7b9",200:"#eb878a",300:"#e3575b",400:"#dd3337",500:"#d70f14",600:"#d30d12",700:"#cd0b0e",800:"#c7080b",900:"#be0406",A100:"#ffe6e6",A200:"#ffb3b4",A400:"#ff8081",A700:"#ff6768",A900:"#ffffff",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","A100","A200","A400","A700","A900"],contrastLightColors:["400","500","600","700","800","900"]};e.definePalette("customPrimary",n);var t={50:"#e2eff6",100:"#b6d8e9",200:"#85beda",300:"#54a4cb",400:"#2f91bf",500:"#0a7db4",600:"#0975ad",700:"#076aa4",800:"#05609c",900:"#034d8c",A100:"#b8daff",A200:"#85c0ff",A400:"#52a5ff",A700:"#3998ff",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","300","A100","A200","A400","A700"],contrastLightColors:["400","500","600","700","800","900"]};e.definePalette("customAccent",t);var o={50:"#ffece0",100:"#ffd1b3",200:"#ffb280",300:"#ff934d",400:"#ff7b26",500:"#ff6400",600:"#ff5c00",700:"#ff5200",800:"#ff4800",900:"#ff3600",A100:"#ffffff",A200:"#ffd1b3",A400:"#ff934d",A700:"#ff6400",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","300","400","500","600","A100","A200","A400","A700"],contrastLightColors:["700","800","900"]};e.definePalette("customWarn",o),e.theme("default").primaryPalette("customPrimary").accentPalette("customAccent",{default:"500","hue-1":"900"}).warnPalette("customWarn")}function fn(){function e(e,n){n[0].setAttribute("data-after","POWERED BY CORE"),e.$on("$destroy",function(){})}return{restrict:"A",scope:!1,link:e}}function fn2(){function e(){}return{restrict:"E",scope:!1,template:'<div layout="row" layout-align="center center" layout-padding>      <div>        <md-icon>          build        </md-icon>      </div>      <div>Das System befindet sich im Wartungsmodus</div>      <md-button>        Nochmal versuchen      </md-button>    </div>',link:e}}function fn3(e){function n(n,t){var o=e.title,r=o.length;r<=8?t[0].classList.add("size-xl"):r<=13?t[0].classList.add("size-l"):t[0].classList.add("size-m"),t[0].innerText=o}return{restrict:"A",scope:!1,link:n}}function fn4(){function e(e,n,t,o){o.$validators.compareTo=function(n){return n===e.otherModelValue};var r=e.$watch("otherModelValue",function(){o.$validate()});e.$on("$destroy",function(){r()})}return{restrict:"A",require:"ngModel",scope:{otherModelValue:"=compareTo"},link:e}}function fn5(e){function n(n,t,o,r){if(!angular.isUndefined(r)){var i=function(n,o){return isChrome()&&t[0].matches("input[type=password]:-webkit-autofill")?(e.cancel(l),!0):s(n,o)},a=0,s=r.$validators.required,l=e(function(){a++,a>5&&e.cancel(l),r.$validate()},125);r.$validators.required=i,n.$on("$destroy",function(){e.cancel(l)})}}return{priority:100,require:"?ngModel",link:n}}function fn6(e){function n(n,t){if(isChrome()){var o=0,r=e(function(){o++,o>5&&e.cancel(r),t[0].querySelector("input[type=password]:-webkit-autofill")&&(t.addClass("md-input-has-value"),e.cancel(r))},100);n.$on("$destroy",function(){e.cancel(r)})}}return{restrict:"E",scope:!1,link:n}}function BiDialogService(e,n){function t(e,n,t,o,r){t=t||l.title,o=o||l.content,r=r||l.okLabel;var i=e.title(t).textContent(o).ok(r);return n&&i.targetEvent(n),i}function o(e,t,o,r){var i=(n("sm")||n("xs"))&&u;return t=t||d.title,o=o||d.templateUrl,r=r||d.clickOutsideToClose,{controller:t,controllerAs:"$ctrl",template:o,parent:angular.element(document.body),targetEvent:e,clickOutsideToClose:r,fullscreen:i}}function r(n,o,r,i){var a=angular.element(document.body),s=e.alert().parent(a).clickOutsideToClose(!0);return e.show(t(s,n,o,r,i))}function i(n,t,o){var r=angular.element(document.body);return e.show({parent:r,targetEvent:n||null,template:t,locals:{data:o},controller:["$scope","$mdDialog","data",function(e,n,t){e.data=t,e.closeDialog=function(){n.hide()}}]})}function a(n,o,r,i,a){var s=e.confirm().cancel(a);return e.show(t(s,n,o,r,i)).then(function(){return!0},function(){return!1})}function s(n,t,r,i){e.show(o(n,t,r,i)).then(function(e){return e},function(){return!1})}var l={title:"This is an alert title",content:"You can specify some description text in here.",okLabel:"Ok"},d={controller:"DialogController",templateUrl:"../../views/dialog.html",clickOutsideToClose:!0},u=n("xs")||n("sm");return{showAlert:r,showConfirm:a,showAdvanced:s,showTemplateDialog:i}}function config(e,n,t,o,r,i){t.useApplyAsync(!0),r.debugInfoEnabled(!1),o.disableWarnings(),e.debugEnabled(!1),i.errorOnUnhandledRejections(!1),t.defaults.withCredentials=!0,t.defaults.useXDomain=!0,t.defaults.headers.common.Accept="application/json",delete t.defaults.headers.common["X-Requested-With"]}function configInt(e){e.interceptors.push(["$rootScope","$q","BIEvents","$injector","BIAuthEnv",function(e,n,t,o,r){var i=function(e){var n;try{var t=r.ignoreErrorsFor,o=t.find(function(n){return e.config.url.indexOf(n.name)>0});n=angular.isDefined(o)}catch(e){n=!1}return n},a=function(){var e=o.get("$state");return r.noAuthRoutes.join("|").indexOf(e.current.name)>-1&&e.current.name.length>1};return{responseError:function(o){return 403===o.status&&!1===a()?(console.log("forbidded"),e.$broadcast(t.FORBIDDEN),n(function(){return null})):401===o.status&&!1===i(o)&&!1===a()?(e.$broadcast(t.UNAUTHORIZED,window.location.href),n(function(){return null})):n.reject(o)}}}])}ResetPasswordController.$inject=["BIAuthService","$state","$stateParams"],LoginController.$inject=["$state","BIAuthService","BIAuthEnv","$location","$window"],ForgotPasswordController.$inject=["BIAuthService"],ForbiddenController.$inject=["$state","BIAuthService","BIAuthEnv","$location","$window"],BIAuthService.$inject=["BIAuthEnv","$q","$http"],run.$inject=["BIAuthEnv","$log","$injector","$rootScope","BIEvents","$mdDialog","$window"],routes.$inject=["$stateProvider","$locationProvider","$urlRouterProvider","$sceProvider"],NavbarController.$inject=["$mdSidenav","$transitions","BIAuthEnv","BIAuthService","$state","$rootScope","$window"],mdtheme.$inject=["$mdThemingProvider"],fn3.$inject=["BIAuthEnv"],fn5.$inject=["$interval"],fn6.$inject=["$interval"],BiDialogService.$inject=["$mdDialog","$mdMedia"],config.$inject=["$logProvider","BIAuthEnvProvider","$httpProvider","$mdAriaProvider","$compileProvider","$qProvider"],configInt.$inject=["$httpProvider"],angular.module("bi.base",["ngAria","ngAnimate","ngSanitize","ngMessages","ui.router","ngMaterial"]),angular.module("bi.base").component("resetPasswordComponent",{templateUrl:"./app/routes/reset-password/el.html",controller:ResetPasswordController}),angular.module("bi.base").component("loginComponent",{templateUrl:"./app/routes/login/el.html",controller:LoginController}),angular.module("bi.base").component("forgotPasswordComponent",{templateUrl:"./app/routes/forgot-password/el.html",controller:ForgotPasswordController}),angular.module("bi.base").component("forbiddenComponent",{templateUrl:"./app/routes/forbidden/el.html",controller:ForbiddenController}),angular.module("bi.base").service("BIAuthService",BIAuthService),angular.module("bi.base").run(run),angular.module("bi.base").config(routes),angular.module("bi.base").component("navbar",{templateUrl:"./app/index/navbar.template.html",controller:NavbarController}),/*! https://mths.be/includes v1.0.0 by @mathias */
/* eslint-disable */
String.prototype.includes||function(){"use strict";var e={}.toString,n=function(){try{var e={},n=Object.defineProperty,t=n(e,e,e)&&n}catch(e){}return t}(),t="".indexOf,o=function(n){if(null==this)throw TypeError();var o=String(this);if(n&&"[object RegExp]"==e.call(n))throw TypeError();var r=o.length,i=String(n),a=i.length,s=arguments.length>1?arguments[1]:void 0,l=s?Number(s):0;return l!=l&&(l=0),!(a+Math.min(Math.max(l,0),r)>r)&&-1!=t.call(o,i,l)};n?n(String.prototype,"includes",{value:o,configurable:!0,writable:!0}):String.prototype.includes=o}(),angular.module("bi.base").config(mdtheme),angular.module("bi.base").provider("BIAuthEnv",function(){var e={basePath:"http://localhost:5050",noAuthRoutes:["login","forgot-password","reset","forbidden"],mainRoute:void 0,errors:{unknown:"An unknown error occurred."},title:"CORE",sidebarTemplate:"./app/components/navbar/sidenav.template.html",internalName:"core"};this.set=function(n){Object.assign(e,n)},this.$get=function(){return e}}),angular.module("bi.base").directive("poweredBy",fn),angular.module("bi.base").directive("maintenanceMode",fn2),angular.module("bi.base").directive("appTitle",fn3),angular.module("bi.base").directive("compareTo",fn4);var isChrome=function(){return navigator.userAgent.match(/chrome/i)&&!navigator.userAgent.match(/edge/i)};angular.module("bi.base").directive("requiredDisabled",fn5),angular.module("bi.base").directive("appTitle",fn6),angular.module("bi.base").factory("BiDialogService",BiDialogService),angular.module("bi.base").config(config),angular.module("bi.base").constant("APPCFG",{APIBASE:angular.isDefined(BIAPIBASE)?BIAPIBASE:""}),angular.module("bi.base").config(configInt),angular.module("bi.base").constant("BIEvents",{UNAUTHORIZED:"BI.EVENTS.AUTH.UNAUTHORIZED",AUTHORIZED:"BI.EVENTS.AUTH.AUTHORIZED",ERROR:"BI.EVENTS.ERROR",VERSION:"BI.EVENTS.VERSION",LOAD:"BI.EVENTS.LOAD",MAINTENANCE:"BI.EVENTS.MAINTENENCE",FORBIDDEN:"FORBIDDEN"}),angular.module("bi.base").run(["$templateCache",function(e){e.put("./app/index/navbar.template.html",'<md-toolbar class="bi-navbar" ng-class="{\'loading\' : $ctrl.vis && $ctrl.currentState == \'login\'}" ng-show="$ctrl.vis">\n  <div class="md-toolbar-tools">\n    <div class="left biBaseMenu">\n      <md-button ng-click="$ctrl.toggleMenu()" class="md-icon-button">\n        <md-icon>menu</md-icon>\n      </md-button>\n    </div>\n    <h3 class="bc-title" ui-sref-active="nav-active" ng-click="$ctrl.goMainRoute()" flex="" app-title="">\n      CORE\n    </h3>\n    <div class="right">\n\n      \x3c!-- local icons --\x3e\n      <span class="biBaseIcons"></span>\n\n      <md-button class="md-icon-button" ng-click="$ctrl.logout()">\n        <md-icon>power_settings_new</md-icon>\n      </md-button>\n    </div>\n  </div>\n  <md-progress-linear class="md-primary" ng-disabled="$ctrl.hideLoader" md-mode="indeterminate"></md-progress-linear>\n\n</md-toolbar>\n\n<md-sidenav class="md-sidenav-left" md-component-id="md-sidenav-left" md-whiteframe="4" layout="column">\n  <md-toolbar class="bi-navbar">\n  </md-toolbar>\n\n  <md-list class="bc-sidenav-header">\n    <md-list-item class="bc-user">\n      <img style="margin-left: 10px" class="md-avatar" alt="User" ng-src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQ0YyQzc3NzFCOTMxMUU3QTFENEYwRjkyQkUzQzAzMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQ0YyQzc3ODFCOTMxMUU3QTFENEYwRjkyQkUzQzAzMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBDRjJDNzc1MUI5MzExRTdBMUQ0RjBGOTJCRTNDMDMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBDRjJDNzc2MUI5MzExRTdBMUQ0RjBGOTJCRTNDMDMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAZABkAwERAAIRAQMRAf/EAHMAAQABBQEAAAAAAAAAAAAAAAABAgMFBgcEAQEAAAAAAAAAAAAAAAAAAAAAEAABAwIBCwIEBQUBAAAAAAABAAIDEQQSITFRYXGBIjJCBQZBobHBUhORYnKSFKKyI1MkNBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A6e5zsRynOgjE7SUDE7SUDE7SUDE7SUEsErzSMOedDQSfZBcdb3jBV8MrRpLHAfBBaxHSgYnaSgYnaSgYnaSgYnaSgqxOwZznQUu5jtQQgICDYfGfGm9wH8u7qLQGjIxkLyM9T9KDd7e1t7eMRwRNjYMzWgAeyC5QIMV3fxvt/cWOOAQ3PTOwUNfzaUHPru1mtLmS2nFJYjR2g6CNRQWUBAQVdG9BDuY7UEICCQxz3NY3meQ0bXGiDqtnbstrSKBgo2NgaBsCC8gICDTvPLRrZrW7aKF4MT9dMoQaogICCro3oIdzHaghAQXbZwbdQOOYSMJ/cEHVwagHSgICAg1fz1w/h2jfUyk/g0oNLQEBBV0b0EO5jtQQgIBrQ0z+iDqXarpt1263naa442k7aZUHqQEBBpHnN0JO4QW4NfssLnDW85PYINaQEBBV0b0EO5jtQQgICDbfCe7sbi7bM6hJL7cn1rzN+aDb0BBZvbyCztpLmd2GOMVJ06gg5he3cl5dy3UnNK4upoHoNwQWEBAQVdG9BDuY7UEIGrOTmCDM2HineLsBxYLeI9Uuen6RlQZG88IngtmS2U7pbuPicDw1p9GghBFp5nfWf/P3O2c97MhfyP3g5Cg9Mnn1mG/47aRz/QOLQEGPwd98muGl7fs2TTUGhDG7K8zkHovvBZm8VjOHj/XLkO5wQa9e9uvrF+C6hdETyuOVp2FB5kBBV0b0EO5jtQQg2nwntUc0kncJmhwiOCAHNizud8gg3NAQWp7S2nFJomSD8zQfigsRdm7VE7Ey0iDtOEH4oPYAAAAKAZgEBB57+xt761ktp24mPFNYPoRrCDl9xBJb3EtvJzxOLHbjn3oLaCro3oIdzHaghB0fxe3EHY7UUoXt+47a84vmgyqAgICAgICDn3mFuIe+SOAoJmNk38p/tQYRBV0b0EO5jtQQ7KCBnKDq9pEIrWKMZAxjWjcEF1AQEBAQEBBpvnsQFxZzermvYdxBHxQaqgq6N6CHcx2oANCDnoQabCg6lYdxsryFr7aZsgoKgHKNRGcIPSgICAgICASAKk0GkoNK827hZ3MltDbyNlfEXGQtNQKgClR6oNYQVdG9BDuY7UEIJY5zHB7HFjxmc0kH8Qgydt5N3y3oG3JkaOmUB/vn90GTg87vmkffto5B6lhLD74kHrZ57bHntJB+lzT8aIKz55Y0yW0xOvCPmgsS+fGh+zZ5fQvf8gCgx9x5p3mUUj+3ANLW4j/USPZBirruXcLv/wBNxJKPpJo39ooEHmQEFXRvQS7BU586CODWgcGtA4NaBwa0Dg1oHBrQODWgcGtA4NaBwa0Dg1oKuDB650H/2Q==">\n      <div class="md-list-item-text">\n        <p class="bc-user-name">{{::$ctrl.profile.realname}}</p>\n        <p class="bc-user-mail">{{::$ctrl.profile.email}}</p>\n        <span></span>\n      </div>\n    </md-list-item>\n  </md-list>\n\n  \x3c!-- local navigation --\x3e\n  <div id="sidebar" class="biBaseSidebar"></div>\n\n</md-sidenav>\n'),e.put("./app/routes/forgot-password/el.html",'<div layout="column" layout-align-xs="start center" layout-align-gt-xs="center center" layout-fill="layout-fill" id="login" class="forgot">\n  <h1 class="bi-powered">POWERED BY CORE</h1>\n  <div class="login-box md-whiteframe-z2" layout="column">\n    <form name="form" novalidate ng-submit="$ctrl.submit($event)">\n      <md-content class="md-padding" layout="column" ng-if="$ctrl.success.message == undefined">\n        <h2>\n          Passwort zurücksetzen\n        </h2>\n        <md-input-container>\n          <label>Ihre Email Adresse</label>\n          <input type="email" ng-model="$ctrl.user.email" name="email" ng-pattern="/^.+@.+\\..+$/" required ng-minlength="5">\n\n          <div ng-messages="form.email.$error" role="alert" ng-if="form.email.$dirty">\n            <div ng-message="required">Geben Sie eine Email Adresse ein.</div>\n            <div ng-message="email">Geben Sie eine valide Email Adresse ein.</div>\n            <div ng-message="minlength">Das Passwort muss aus mindestens 5 Zeichen bestehen.</div>\n          </div>\n          <div class="bi-alert md-block" ng-if="$ctrl.error" role="alert">\n            <span class="md-body-1">{{$ctrl.error}}</span>\n          </div>\n        </md-input-container>\n        <div layout="column">\n          <md-button type="submit" class="md-raised md-primary" ng-disabled="form.$invalid">ANFORDERN</md-button>\n        </div>\n        <br>\n        <md-button class="bi-reset-pw" ui-sref="login" md-no-ink> Zurück zum login</md-button>\n      </md-content>\n      <md-content ng-if="$ctrl.success.message" class="md-padding" layout="column">\n        <p>{{::$ctrl.success.message}}</p>\n        <md-button class="bi-reset-pw" ui-sref="login" md-no-ink> Zurück zum login</md-button>\n      </md-content>\n    </form>\n  </div>\n  <div class="bi-copyright"><span>&copy; 2017</span></div>\n</div>\n'),e.put("./app/routes/forbidden/el.html",'<div layout="column" layout-align-xs="start center" layout-align-gt-xs="center center" layout-fill="layout-fill" id="login" ng-class="{ready: $ctrl.ready}">\n  <h1 class="bi-powered">POWERED BY CORE</h1>\n  <div class="login-box md-whiteframe-z2" layout="column">\n    <form name="form" novalidate="">\n      <md-content class="md-padding" layout="column">\n        <h2 class="bi-headline">FORBIDDEN</h2>\n        <p>You are not alowed to access this page. Please contact us at \n          <a href="mailto:bi-ops@plan-net.com">bi-ops@plan-net.com</a>\n        </p>\n        <md-button class="bi-reset-pw" ui-sref="login" md-no-ink>\n          Back to login\n        </md-button>\n      </md-content>\n    </form>\n  </div>\n  <div class="bi-copyright"><span>&copy; 2017</span></div>\n</div>'),e.put("./app/routes/login/el.html",'<div layout="column" layout-align-xs="start center" layout-align-gt-xs="center center" layout-fill="layout-fill" id="login" ng-class="{ready: $ctrl.ready}">\n  <h1 class="bi-powered">POWERED BY CORE</h1>\n  <div class="login-box md-whiteframe-z2" layout="column">\n    <form name="form" novalidate="">\n      <md-content class="md-padding" layout="column">\n        <h2 class="bi-headline" app-title=""></h2>\n        <md-input-container>\n          <label>Nutzername</label>\n          <input type="text" ng-model="$ctrl.user.username" name="username" required="" ng-minlength="3" md-autofocus required-disabled>\n          <div ng-messages="form.username.$error" role="alert" ng-show="form.username.$dirty">\n            <div ng-message="required">Geben Sie einen Namen ein.</div>\n            <div ng-message="minlength">Der Name muss aus mindestens 3 Zeichen bestehen.</div>\n          </div>\n        </md-input-container>\n        <md-input-container>\n          <label>Passwort</label>\n          <input ng-model="$ctrl.user.password" name="password" type="password" required="" ng-minlength="3" required-disabled>\n\n          <div ng-messages="form.password.$error" role="alert" ng-show="form.password.$dirty">\n            <div ng-message="required">Geben Sie ein Passwort ein.</div>\n            <div ng-message="minlength">Das Passwort muss aus mindestens 3 Zeichen bestehen.</div>\n          \n\n          <div class="bi-alert md-block" ng-if="$ctrl.error" role="alert">\n            <span class="md-body-1" md-colors="{color: \'warn-500\'}">Bitte überprüfen Sie ihren Namen und das Passwort.</span>\n          </div>\n        </div></md-input-container>\n        <div layout="column">\n          <md-button type="submit" class="md-raised md-primary" ng-disabled="form.$invalid" ng-click="$ctrl.submit()">\n            LOGIN</md-button>\n        </div>\n        <br>\n        <md-button class="bi-reset-pw" ui-sref="forgot-password" md-no-ink="">Passwort zurücksetzen</md-button>\n      </md-content>\n    </form>\n  </div>\n  <div class="bi-copyright"><span>&copy; 2017</span></div>\n</div>\n'),e.put("./app/routes/reset-password/el.html",'<div layout="column" layout-align-xs="start center" layout-align-gt-xs="center center" layout-fill="layout-fill" id="login" class="reset">\n  <h1 class="bi-powered">POWERED BY CORE</h1>\n  <div class="login-box md-whiteframe-z2" layout="column">\n    <form name="form" novalidate ng-submit="$ctrl.submit($event)">\n      <md-content class="md-padding" layout="column">\n        <h2>\n          Neues Passwort\n        </h2>\n        <md-input-container class="md-block">\n          <label>Neues Passwort</label>\n          <input ng-model="$ctrl.user.password" name="password" type="password" required ng-minlength="3" ng-disabled="$ctrl.error.password_code">\n          <div ng-messages="form.password.$error" role="alert" ng-if="form.password.$dirty">\n            <div ng-message="required">Geben Sie ein neues Passwort ein.</div>\n            <div ng-message="minlength">Das Passwort muss aus mindestens 6 Zeichen bestehen.</div>\n          </div>\n        </md-input-container>\n        <md-input-container class="md-block">\n          <label>Passwort wiederholen</label>\n          <input ng-model="$ctrl.confirmPassword" name="confirmPassword" type="password" required ng-disabled="$ctrl.error.password_code" ng-minlength="3" compare-to="$ctrl.user.password">\n          <div ng-messages="form.confirmPassword.$error" role="alert" ng-if="form.confirmPassword.$dirty">\n            <div ng-message="required">Geben Sie ein neues Passwort ein.</div>\n            <div ng-message="minlength">Das Passwort muss aus mindestens 6 Zeichen bestehen.</div>\n            <div ng-message="compareTo">Die Passwörter müssen übereinstimmen.</div>\n\n          </div>\n          <br>\n          <div class="c-alert md-block" ng-if="$ctrl.error">\n            <ul style="margin:0;list-style:none;padding:0">\n              <li ng-if="$ctrl.error.length">\n                <p>Password to weak</p>\n                </li>\n              <li ng-repeat="(key, value) in $ctrl.error">\n                <p>{{value}}</p>\n              </li>\n            </ul>\n            <br>\n            <a href="#" ui-sref="forgot-password" ng-if="$ctrl.error.password_code">Create new token</a>\n          </div>\n        </md-input-container>\n\n        <md-button type="submit" class="md-raised md-primary" ng-disabled="form.$invalid || $ctrl.error.password_code">Weiter\n        </md-button>\n      </md-content>\n\n    </form>\n  </div>\n  <div class="bi-copyright"><span>&copy; 2017</span></div>\n</div>\n')}]);