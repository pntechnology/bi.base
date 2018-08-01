function ResetPasswordController(e,n,t){var r=this;r.user={password_code:t.code,password:void 0},r.submit=function(){e.reset(this.user).then(function(){n.go("login")},function(e){r.error=e})}}function PPController(e,n,t,r){var i=this;i.showImprint=function(){"login"===t.current.name||r.showInternalInDialogs?e.$broadcast(n.SHOW_COMPONENT,{type:"imprint"}):t.go("imprint")},i.$onInit=function(){}}function LoginController(e,n,t,r,i,o,a){var s=this;s.optIn=!1,s.showDatenschutz=function(){o.$broadcast(a.SHOW_COMPONENT,{type:"dse"})};var l=function(){angular.isDefined(r.search().next)?i.location.assign(r.search().next):angular.isDefined(t.mainRoute.route)&&angular.isDefined(t.mainRoute.param)?e.go(t.mainRoute.route,t.mainRoute.param):e.go(t.mainRoute)};s.onOptInClick=function(e){n.setPriPolCookie(),n.optIn({_id:s.user._id,opt_in:e||n.getCookieDate()}).then(l)};var u=function(e){const t=n.isPriPolCookieSet();null==e.opt_in?(s.user=Object.assign(s.user,e),"string"==typeof t?s.onOptInClick(t):s.optIn=!0):("string"!=typeof t&&n.setPriPolCookie(),l())};s.submit=function(){n.login(s.user).then(function(){n.profile().then(u)},function(e){s.error=!angular.isString(e)||e})},s.$onInit=function(){n.profile().then(u,function(e){s.error=!angular.isString(data)||data,s.ready=!0}),angular.extend(s,{error:void 0,user:{username:null,password:null}})}}function Ctrl(){this.$onInit=function(){}}function ForgotPasswordController(e){var n=this;n.user={email:""},n.submit=function(){e.reset(n.user).then(function(){n.error=void 0,n.success={success:!0,message:"Eine Email mit einem Link zum zurücksetzen ihres Passwortes wurde an folgende Adresse geschickt: \n\n"+n.user.email+"."}},function(e){n.error=e.email+"."})}}function ForbiddenController(e,n,t,r,i){var o=this,a=function(){angular.isDefined(r.search().next)?i.location.assign(r.search().next):angular.isDefined(t.mainRoute.route)&&angular.isDefined(t.mainRoute.param)?e.go(t.mainRoute.route,t.mainRoute.param):e.go(t.mainRoute)};o.submit=function(){n.login(o.user).then(a,function(e){o.error=!angular.isString(e)||e})}}function CookiesController(){this.$onInit=function(){console.log("init cookies")}}function BIAuthService(e,n,t){var r=e.basePath,i={login:r+"/login2",logout:r+"/logout",reset:r+"/reset",profile:r+"/profile",user:r+"/user",info:r+"/info",optIn:r+"/optin"},o={isAuthenticated:!1};this.getCookieDate=function(){var e=new Date;return new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds()))},this.setPriPolCookie=function(){var e=new Date;e.setTime(e.getTime()+24192e5);var n="; expires="+e.toUTCString();document.cookie="fguusdifhsk="+this.getCookieDate()+n+"; path=/"},this.isPriPolCookieSet=function(){return function(){for(var e=document.cookie.split(";"),n=0;n<e.length;n++){for(var t=e[n];" "==t.charAt(0);)t=t.substring(1,t.length);if(0==t.indexOf("fguusdifhsk="))return t.substring("fguusdifhsk=".length,t.length)}return null}()};var a=function(e){if(Object.prototype.hasOwnProperty.call(e,"message"))return e;for(var n=0;n<Object.keys(e).length;n++)if(angular.isObject(e[Object.keys(e)[n]])){var t=a(e[Object.keys(e)[n]]);if(null!==t)return t}return null},s=function(e){var t=a(e).message;return null===t?n.reject(this.BIAuthEnv.unknown):n.reject(t)},l=function(e){return e.data.result};this.info=function(){return t({method:"GET",url:i.info}).then(l,s)},this.updatePassword=function(e){return angular.isDefined(e.password)?t({method:"PUT",data:e,url:i.user}).then(l,s):n.reject("Please set a password")},this.optIn=function(e){return t({method:"PUT",data:e,url:i.optIn}).then(l,s)},this.reset=function(e){return angular.isDefined(e.password_code)?t({method:"POST",data:e,url:i.reset}).then(l,s):t({method:"GET",url:i.reset+"?email="+e.email}).then(l,s)},this.profile=function(e){return o.isAuthenticated&&!e?n.when(o):t({method:"GET",url:i.profile}).then(function(e){return o=angular.extend(e.data.result,{isAuthenticated:!0})},s)},this.logout=function(){return o={isAuthenticated:!1},t({method:"GET",url:i.logout}).then(l,s)},this.login=function(e){return t({method:"POST",url:i.login,data:e}).then(function(){return this.profile(!0)}.bind(this),s)}}function run(e,n,t,r,i,o){var a=t.$on(r.UNAUTHORIZED,function(e,t){const r=angular.isDefined(t)?{next:t}:null;n.get("$state").go("login",r,{notify:!1}).then(o.location.reload)}),s=t.$on(r.FORBIDDEN,function(e,n){d(n)}),l=t.$on(r.SHOW_COMPONENT,function(e,n){c(n.type)});try{n.get("$state").defaultErrorHandler(angular.noop)}catch(e){}var u=function(e){var n=i.alert({clickOutsideToClose:!0,escapeToClose:!0,title:"Fehler",textContent:angular.toJson(e),ok:"OK"});i.show(n).finally(function(){n=void 0})},d=function(e){function n(e,n,t,r){e.closeDialog=function(){r.go(t.mainRoute),n.hide()}}n.$inject=["$scope","$mdDialog","BIAuthEnv","$state"];var t=i.alert({clickOutsideToClose:!1,escapeToClose:!1,controller:n,template:'<md-dialog aria-label="Error dialog" style="padding: 16px;">  <md-dialog-content>    <p><strong>Fehler 403: Zugriff verweigert</strong></p><p></p>Bitte kontaktieren Sie uns unter:<br>      <a href="mailto:bi-ops@plan-net.com">bi-ops@plan-net.com</a>    </p>  </md-dialog-content>  <md-dialog-actions>    <md-button ng-click="closeDialog()" class="md-primary">      Zur Startseite    </md-button>  </md-dialog-actions></md-dialog>'});i.show(t).finally(function(){t=void 0})},c=function(e){function n(e,n){e.closeDialog=function(){n.hide()}}n.$inject=["$scope","$mdDialog"];const t="dse"===e?'<pp-component type="layer"></pp-component>':'<imprint-component type="layer"></imprint-component>';var r=i.alert({clickOutsideToClose:!1,escapeToClose:!1,controller:n,template:'<md-dialog style="padding: 16px;">  <md-dialog-content>'+t+'  </md-dialog-content>  <md-dialog-actions>    <md-button ng-click="closeDialog()" class="md-primary">      Schließen    </md-button>  </md-dialog-actions></md-dialog>'});i.show(r).finally(function(){r=void 0})},g=t.$on(r.ERROR,function(e,n){u(n)});t.$on("$destroy",function(){a(),g(),s(),l()})}function routes(e,n,t,r){r.enabled(!1),e.state("login",{url:"/?next",component:"loginComponent"}).state("forgot-password",{url:"/forgot-password",component:"forgotPasswordComponent"}).state("reset",{url:"/reset/:code",component:"resetPasswordComponent"}).state("privacy",{url:"/privacy-policy",component:"ppComponent"}).state("imprint",{url:"/imprint",component:"imprintComponent"}),n.html5Mode(!1).hashPrefix(""),t.otherwise("/")}function NavbarController(e,n,t,r,i,o,a){var s,l,u=this;u.hideLoader=!0,u.toggleMenu=function(){e("md-sidenav-left").toggle()},u.goMainRoute=function(){angular.isDefined(t.mainRoute.route)&&angular.isDefined(t.mainRoute.param)?i.go(t.mainRoute.route,t.mainRoute.param):i.go(t.mainRoute)};var d=function(){i.go("login",null,{notify:!1,reload:!0}).then(function(){location.reload()})};u.logout=function(){r.logout().then(d,d)},u.onLoad=function(e,n){u.hideLoader=!n},u.$onInit=function(){l=o.$on("BI.EVENTS.LOAD",u.onLoad),u.vis=!0,u.profile=void 0;var i=t.noAuthRoutes;s=n.onStart({},function(n){e("md-sidenav-left").close(),u.currentState=n.to().name;var t=-1===i.indexOf(u.currentState);u.vis=t,angular.isUndefined(u.profile)&&r.profile().then(function(e){u.profile=e},function(){u.profile=void 0})})},u.$onDestroy=function(){s(),l()}}function mdtheme(e){var n={50:"#fae2e3",100:"#f3b7b9",200:"#eb878a",300:"#e3575b",400:"#dd3337",500:"#d70f14",600:"#d30d12",700:"#cd0b0e",800:"#c7080b",900:"#be0406",A100:"#ffe6e6",A200:"#ffb3b4",A400:"#ff8081",A700:"#ff6768",A900:"#ffffff",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","A100","A200","A400","A700","A900"],contrastLightColors:["400","500","600","700","800","900"]};e.definePalette("customPrimary",n);var t={50:"#e2eff6",100:"#b6d8e9",200:"#85beda",300:"#54a4cb",400:"#2f91bf",500:"#0a7db4",600:"#0975ad",700:"#076aa4",800:"#05609c",900:"#034d8c",A100:"#b8daff",A200:"#85c0ff",A400:"#52a5ff",A700:"#3998ff",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","300","A100","A200","A400","A700"],contrastLightColors:["400","500","600","700","800","900"]};e.definePalette("customAccent",t);var r={50:"#ffece0",100:"#ffd1b3",200:"#ffb280",300:"#ff934d",400:"#ff7b26",500:"#ff6400",600:"#ff5c00",700:"#ff5200",800:"#ff4800",900:"#ff3600",A100:"#ffffff",A200:"#ffd1b3",A400:"#ff934d",A700:"#ff6400",contrastDefaultColor:"light",contrastDarkColors:["50","100","200","300","400","500","600","A100","A200","A400","A700"],contrastLightColors:["700","800","900"]};e.definePalette("customWarn",r),e.theme("default").primaryPalette("customPrimary").accentPalette("customAccent",{default:"500","hue-1":"900"}).warnPalette("customWarn")}function fn2(){function e(){}return{restrict:"E",scope:!1,template:'<div layout="row" layout-align="center center" layout-padding>      <div>        <md-icon>          build        </md-icon>      </div>      <div>Das System befindet sich im Wartungsmodus</div>      <md-button>        Nochmal versuchen      </md-button>    </div>',link:e}}function fn3(e){function n(n,t){var r=e.title,i=r.length;i<=8?t[0].classList.add("size-xl"):i<=13?t[0].classList.add("size-l"):t[0].classList.add("size-m"),t[0].innerText=r}return{restrict:"A",scope:!1,link:n}}function fn4(){function e(e,n,t,r){r.$validators.compareTo=function(n){return n===e.otherModelValue};var i=e.$watch("otherModelValue",function(){r.$validate()});e.$on("$destroy",function(){i()})}return{restrict:"A",require:"ngModel",scope:{otherModelValue:"=compareTo"},link:e}}function fn5(e){function n(n,t,r,i){if(!angular.isUndefined(i)){var o=function(n,r){return isChrome()&&t[0].matches("input[type=password]:-webkit-autofill")?(e.cancel(l),!0):s(n,r)},a=0,s=i.$validators.required,l=e(function(){a++,a>5&&e.cancel(l),i.$validate()},125);i.$validators.required=o,n.$on("$destroy",function(){e.cancel(l)})}}return{priority:100,require:"?ngModel",link:n}}function fn6(e){function n(n,t){if(isChrome()){var r=0,i=e(function(){r++,r>5&&e.cancel(i),t[0].querySelector("input[type=password]:-webkit-autofill")&&(t.addClass("md-input-has-value"),e.cancel(i))},100);n.$on("$destroy",function(){e.cancel(i)})}}return{restrict:"E",scope:!1,link:n}}function BiDialogService(e,n){function t(e,n,t,r,i){t=t||l.title,r=r||l.content,i=i||l.okLabel;var o=e.title(t).textContent(r).ok(i);return n&&o.targetEvent(n),o}function r(e,t,r,i){var o=(n("sm")||n("xs"))&&d;return t=t||u.title,r=r||u.templateUrl,i=i||u.clickOutsideToClose,{controller:t,controllerAs:"$ctrl",template:r,parent:angular.element(document.body),targetEvent:e,clickOutsideToClose:i,fullscreen:o}}function i(n,r,i,o){var a=angular.element(document.body),s=e.alert().parent(a).clickOutsideToClose(!0);return e.show(t(s,n,r,i,o))}function o(n,t,r){var i=angular.element(document.body);return e.show({parent:i,targetEvent:n||null,template:t,locals:{data:r},controller:["$scope","$mdDialog","data",function(e,n,t){e.data=t,e.closeDialog=function(){n.hide()}}]})}function a(n,r,i,o,a){var s=e.confirm().cancel(a);return e.show(t(s,n,r,i,o)).then(function(){return!0},function(){return!1})}function s(n,t,i,o){e.show(r(n,t,i,o)).then(function(e){return e},function(){return!1})}var l={title:"This is an alert title",content:"You can specify some description text in here.",okLabel:"Ok"},u={controller:"DialogController",templateUrl:"../../views/dialog.html",clickOutsideToClose:!0},d=n("xs")||n("sm");return{showAlert:i,showConfirm:a,showAdvanced:s,showTemplateDialog:o}}function CookieController(e,n,t,r){var i=this;i.vis=!0,i.setCookie=function(){e.setPriPolCookie(),i.vis=!1},i.showDatenschutz=function(){t.$broadcast(r.SHOW_COMPONENT,{type:"dse"})},i.showImpressum=function(){t.$broadcast(r.SHOW_COMPONENT,{type:"imprint"})},i.$onChanges=function(e){try{"string"==typeof e.currentValue.opt_in&&(i.vis=!1)}catch(e){}},i.$onInit=function(){i.vis="string"!=typeof e.isPriPolCookieSet()}}function config(e,n,t,r,i,o){t.useApplyAsync(!0),i.debugInfoEnabled(!1),r.disableWarnings(),e.debugEnabled(!1),o.errorOnUnhandledRejections(!1),t.defaults.withCredentials=!0,t.defaults.useXDomain=!0,t.defaults.headers.common.Accept="application/json",delete t.defaults.headers.common["X-Requested-With"]}function configInt(e){e.interceptors.push(["$rootScope","$q","BIEvents","$injector","BIAuthEnv",function(e,n,t,r,i){var o=function(e){var n;try{var t=i.ignoreErrorsFor,r=t.find(function(n){return e.config.url.indexOf(n.name)>0});n=angular.isDefined(r)}catch(e){n=!1}return n},a=function(){var e=r.get("$state");return i.noAuthRoutes.join("|").indexOf(e.current.name)>-1&&e.current.name.length>1};return{responseError:function(r){return 403===r.status&&!1===a()?(e.$broadcast(t.FORBIDDEN,r),n(function(){return null})):401===r.status&&!1===o(r)&&!1===a()?(e.$broadcast(t.UNAUTHORIZED,window.location.href),n(function(){return null})):n.reject(r)}}}])}ResetPasswordController.$inject=["BIAuthService","$state","$stateParams"],PPController.$inject=["$rootScope","BIEvents","$state","BIAuthEnv"],LoginController.$inject=["$state","BIAuthService","BIAuthEnv","$location","$window","$rootScope","BIEvents"],ForgotPasswordController.$inject=["BIAuthService"],ForbiddenController.$inject=["$state","BIAuthService","BIAuthEnv","$location","$window"],BIAuthService.$inject=["BIAuthEnv","$q","$http"],run.$inject=["BIAuthEnv","$injector","$rootScope","BIEvents","$mdDialog","$window"],routes.$inject=["$stateProvider","$locationProvider","$urlRouterProvider","$sceProvider"],NavbarController.$inject=["$mdSidenav","$transitions","BIAuthEnv","BIAuthService","$state","$rootScope","$window"],mdtheme.$inject=["$mdThemingProvider"],fn3.$inject=["BIAuthEnv"],fn5.$inject=["$interval"],fn6.$inject=["$interval"],BiDialogService.$inject=["$mdDialog","$mdMedia"],CookieController.$inject=["BIAuthService","$state","$rootScope","BIEvents"],config.$inject=["$logProvider","BIAuthEnvProvider","$httpProvider","$mdAriaProvider","$compileProvider","$qProvider"],configInt.$inject=["$httpProvider"],angular.module("bi.base",["ngAria","ngAnimate","ngSanitize","ngMessages","ui.router","ngMaterial"]),angular.module("bi.base").component("resetPasswordComponent",{templateUrl:"./app/routes/reset-password/el.html",controller:ResetPasswordController}),angular.module("bi.base").component("ppComponent",{templateUrl:"./app/routes/privacy-policy/el.html",controller:PPController,bindings:{type:"@"}}),angular.module("bi.base").component("loginComponent",{templateUrl:"./app/routes/login/el.html",controller:LoginController}),angular.module("bi.base").component("imprintComponent",{templateUrl:"./app/routes/imprint/el.html",controller:Ctrl}),angular.module("bi.base").component("forgotPasswordComponent",{templateUrl:"./app/routes/forgot-password/el.html",controller:ForgotPasswordController}),angular.module("bi.base").component("forbiddenComponent",{templateUrl:"./app/routes/forbidden/el.html",controller:ForbiddenController}),angular.module("bi.base").component("cookiesComponent",{templateUrl:"./app/routes/cookies/el.html",controller:CookiesController}),angular.module("bi.base").service("BIAuthService",BIAuthService),angular.module("bi.base").run(run),angular.module("bi.base").config(routes),angular.module("bi.base").component("navbar",{templateUrl:"./app/index/navbar.template.html",controller:NavbarController}),/*! https://mths.be/includes v1.0.0 by @mathias */
/* eslint-disable */
String.prototype.includes||function(){"use strict";var e={}.toString,n=function(){try{var e={},n=Object.defineProperty,t=n(e,e,e)&&n}catch(e){}return t}(),t="".indexOf,r=function(n){if(null==this)throw TypeError();var r=String(this);if(n&&"[object RegExp]"==e.call(n))throw TypeError();var i=r.length,o=String(n),a=o.length,s=arguments.length>1?arguments[1]:void 0,l=s?Number(s):0;return l!=l&&(l=0),!(a+Math.min(Math.max(l,0),i)>i)&&-1!=t.call(r,o,l)};n?n(String.prototype,"includes",{value:r,configurable:!0,writable:!0}):String.prototype.includes=r}(),angular.module("bi.base").config(mdtheme),angular.module("bi.base").provider("BIAuthEnv",function(){var e={basePath:"http://localhost:5050",noAuthRoutes:["login","forgot-password","reset","forbidden"],mainRoute:void 0,errors:{unknown:"An unknown error occurred."},title:"CORE",sidebarTemplate:"./app/components/navbar/sidenav.template.html",internalName:"core"};this.set=function(n){Object.assign(e,n)},this.$get=function(){return e}}),angular.module("bi.base").directive("maintenanceMode",fn2),angular.module("bi.base").directive("appTitle",fn3),angular.module("bi.base").directive("compareTo",fn4);var isChrome=function(){return navigator.userAgent.match(/chrome/i)&&!navigator.userAgent.match(/edge/i)};angular.module("bi.base").directive("requiredDisabled",fn5),angular.module("bi.base").directive("appTitle",fn6),angular.module("bi.base").factory("BiDialogService",BiDialogService),angular.module("bi.base").component("cookie",{templateUrl:"./app/index/cookie.html",controller:CookieController,bindings:{profile:"<"}}),angular.module("bi.base").config(config),angular.module("bi.base").constant("APPCFG",{APIBASE:angular.isDefined(BIAPIBASE)?BIAPIBASE:""}),angular.module("bi.base").config(configInt),angular.module("bi.base").constant("BIEvents",{UNAUTHORIZED:"BI.EVENTS.AUTH.UNAUTHORIZED",AUTHORIZED:"BI.EVENTS.AUTH.AUTHORIZED",ERROR:"BI.EVENTS.ERROR",VERSION:"BI.EVENTS.VERSION",LOAD:"BI.EVENTS.LOAD",MAINTENANCE:"BI.EVENTS.MAINTENENCE",FORBIDDEN:"FORBIDDEN",SHOW_COMPONENT:"SHOW_COMPONENT"}),angular.module("bi.base").run(["$templateCache",function(e){e.put("./app/index/cookie.html",'<div ng-if="$ctrl.vis" class="cookie" layout="row" layout-align="center center">\n  <div class="txt-container" layout="row">\n    <div flex>Wir verwenden Cookies, um die Aufrufe unserer Website zu analysieren.<br>\t\n      Mit der Nutzung unserer Website erklären Sie sich damit einverstanden.</div>\n    <div flex="none">\n      <md-button ng-click="$ctrl.setCookie()" style="margin-top: -2px">Zustimmen</md-button>\t\n      <md-button ng-click="$ctrl.showDatenschutz()" style="margin-top: -2px">Mehr Informationen</md-button>\t\n    </div>\n  </div>\n</div>\n'),e.put("./app/index/navbar.template.html",'<md-toolbar class="bi-navbar" ng-class="{\'loading\' : $ctrl.vis && $ctrl.currentState == \'login\'}" ng-show="$ctrl.vis">\n  <div class="md-toolbar-tools">\n    <div class="left biBaseMenu">\n      <md-button ng-click="$ctrl.toggleMenu()" class="md-icon-button">\n        <md-icon>menu</md-icon>\n      </md-button>\n    </div>\n    <h3 class="bc-title" ui-sref-active="nav-active" ng-click="$ctrl.goMainRoute()" flex="" app-title="">\n      CORE\n    </h3>\n    <div class="right">\n\n      \x3c!-- local icons --\x3e\n      <span class="biBaseIcons"></span>\n\n      <md-button class="md-icon-button" ng-click="$ctrl.logout()" alt="Logout">\n        \x3c!-- <md-icon>power_settings_new</md-icon> --\x3e\n        <img width="24px" height="24px" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTE5MiAyNzcuNGgxODkuN2wtNDMuNiA0NC43TDM2OCAzNTJsOTYtOTYtOTYtOTYtMzEgMjkuOSA0NC43IDQ0LjdIMTkydjQyLjh6Ii8+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0yNTUuNyA0MjEuM2MtNDQuMSAwLTg1LjUtMTcuMi0xMTYuNy00OC40LTMxLjItMzEuMi00OC4zLTcyLjctNDguMy0xMTYuOSAwLTQ0LjEgMTcuMi04NS43IDQ4LjMtMTE2LjkgMzEuMi0zMS4yIDcyLjYtNDguNCAxMTYuNy00OC40IDQ0IDAgODUuMyAxNy4xIDExNi41IDQ4LjJsMzAuMy0zMC4zYy04LjUtOC40LTE3LjgtMTYuMi0yNy43LTIzLjJDMzM5LjcgNjEgMjk4LjYgNDggMjU1LjcgNDggMTQxLjIgNDggNDggMTQxLjMgNDggMjU2czkzLjIgMjA4IDIwNy43IDIwOGM0Mi45IDAgODQtMTMgMTE5LTM3LjUgMTAtNyAxOS4yLTE0LjcgMjcuNy0yMy4ybC0zMC4yLTMwLjJjLTMxLjEgMzEuMS03Mi41IDQ4LjItMTE2LjUgNDguMnpNNDQ4LjAwNCAyNTYuODQ3bC0uODQ5LS44NDguODQ5LS44NDkuODQ4Ljg0OXoiLz48L3N2Zz4=" title="Logout">   \n      </md-button>\n    </div>\n  </div>\n  <md-progress-linear class="md-primary" ng-disabled="$ctrl.hideLoader" md-mode="indeterminate"></md-progress-linear>\n\n</md-toolbar>\n\n<md-sidenav class="md-sidenav-left" md-component-id="md-sidenav-left" md-whiteframe="4" layout="column">\n  <md-toolbar class="bi-navbar">\n  </md-toolbar>\n\n  <md-list class="bc-sidenav-header">\n    <md-list-item class="bc-user">\n      <div class="avatar-container" layout="row" layout-align="center center">\n        <div flex>\n          <md-icon>person</md-icon>\n        </div>\n      </div>\n      <div class="md-list-item-text">\n        <p class="bc-user-name">{{::$ctrl.profile.realname}}</p>\n        <p class="bc-user-mail">{{::$ctrl.profile.email}}</p>\n        <span></span>\n      </div>\n    </md-list-item>\n  </md-list>\n\n  \x3c!-- local navigation --\x3e\n  <div id="sidebar" class="biBaseSidebar"></div>\n\n  <div class="further-links" layout="row" layout-align="center center">\n    <md-button class="md-primary" ui-sref-active="nav-active" md-no-ink ui-sref="privacy">\n      Datenschutz\n    </md-button>\n    <md-button class="md-primary" ui-sref-active="nav-active" md-no-ink ui-sref="imprint">\n      Impressum\n    </md-button>\n  </div>\n</md-sidenav>\n'),e.put("./app/routes/imprint/el.html",'<div layout="column" layout-align="center" id="imprint">\n  <md-card flex="100" flex-gt-sm="96" flex-gt-md="96" flex-gt-lg="70" layout-padding layout-margin>\n    <md-card-content layout="column">\n      <h2 class="md-headline">Impressum</h2>\n      <div class="txt">\n        <address>\n          Plan.Net Business Intelligence\n          <br>Brienner Str. 45a-d\n          <br>80333 München / Deutschland\n        </address>\n\n        <strong>Kontakt: </strong>\n        Tel: +49 89 2050 30\n        <br> Fax: +49 89 2050 3611\n        <br> E-Mail: bi-ops(at)plan-net.com\n\n        <strong>Rechtsform: </strong>\n        GmbH & Co. KG\n        <br> Handelsregisternummer: HRA 79530\n        <br> Amtsgericht München\n        <br> Gerichtsstand und Erfüllungsort: München\n        <br> USt-ID-Nr.: DE222163784\n        <br>\n\n        <strong>Geschäftsführer:</strong>\n        Marcus Ambrus\n        <br> Michael Rau\n        <br> Manfred Klaus\n        <br> Dr. Andrea Malgara\n        <br>\n\n        <strong>Redaktionell Verantwortlicher gem. § 55 Abs. 2 Rundfunkstaatsvertrag:</strong>\n        <address>\n          Michael Rau\n          <br>Brienner Str. 45a-d\n          <br>80333 München / Deutschland\n        </address>\n\n        <strong>Haftungshinweis: </strong>\n        <div>\n          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.<br>Für den Inhalt der\n          verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.\n        </div>\n      </div>\n\n    </md-card-content>\n\n  </md-card>\n\n</div>\n'),e.put("./app/routes/forgot-password/el.html",'<div layout="column" layout-align-xs="start center" layout-align-gt-xs="center center" layout-fill="layout-fill" id="login" class="forgot">\n  <h1 class="bi-powered">POWERED BY CORE</h1>\n  <div class="login-box md-whiteframe-z2" layout="column">\n    <form name="form" novalidate ng-submit="$ctrl.submit($event)">\n      <md-content class="md-padding" layout="column" ng-if="$ctrl.success.message == undefined">\n        <h2>\n          Passwort zurücksetzen\n        </h2>\n        <md-input-container>\n          <label>Ihre Email Adresse</label>\n          <input type="email" ng-model="$ctrl.user.email" name="email" ng-pattern="/^.+@.+\\..+$/" required ng-minlength="5">\n\n          <div ng-messages="form.email.$error" role="alert" ng-if="form.email.$dirty">\n            <div ng-message="required">Geben Sie eine Email Adresse ein.</div>\n            <div ng-message="email">Geben Sie eine valide Email Adresse ein.</div>\n            <div ng-message="minlength">Das Passwort muss aus mindestens 5 Zeichen bestehen.</div>\n          </div>\n          <div class="bi-alert md-block" ng-if="$ctrl.error" role="alert">\n            <span class="md-body-1">{{$ctrl.error}}</span>\n          </div>\n        </md-input-container>\n        <div layout="column">\n          <md-button type="submit" class="md-raised md-primary" ng-disabled="form.$invalid">ANFORDERN</md-button>\n        </div>\n        <br>\n        <md-button class="bi-reset-pw" ui-sref="login" md-no-ink> Zurück zum login</md-button>\n      </md-content>\n      <md-content ng-if="$ctrl.success.message" class="md-padding" layout="column">\n        <p>{{::$ctrl.success.message}}</p>\n        <md-button class="bi-reset-pw" ui-sref="login" md-no-ink> Zurück zum login</md-button>\n      </md-content>\n    </form>\n  </div>\n  <div class="bi-copyright"><span>&copy; 2017</span></div>\n</div>\n'),e.put("./app/routes/login/el.html",'<div layout="column" layout-align-xs="start center" layout-align-gt-xs="center center" layout-fill="layout-fill" id="login" ng-class="{ready: $ctrl.ready}">\n    <h1 class="bi-powered">POWERED BY CORE</h1>\n    <div class="login-box md-whiteframe-z2" layout="column">\n      <form name="form" novalidate="">\n        <md-content class="md-padding" layout="column" ng-if="$ctrl.optIn">\n          <h2 class="bi-headline" style="margin-bottom: 0">Cookies</h2>\n          <md-input-container>\n            <p style="margin-top: 0">\n              Wir verwenden <strong>Cookies</strong>, um die Aufrufe unserer Website zu analysieren.<br>\n              Mit der Nutzung unserer Website erklären Sie sich damit einverstanden.\n            </p>\n          </md-input-container>\n          <md-button class="md-primary" ng-click="$ctrl.showDatenschutz()">Mehr Informationen</md-button>\n          <br>\n          <div layout="column">\n            <md-button type="submit" class="md-raised md-primary" ng-click="$ctrl.onOptInClick()">\n              Zustimmen</md-button>\n          </div>\n        </md-content>\n        <md-content class="md-padding" layout="column" ng-if="!$ctrl.optIn">\n          <h2 class="bi-headline" app-title=""></h2>\n          <md-input-container>\n            <label>Nutzername</label>\n            <input type="text" ng-model="$ctrl.user.username" name="username" required="" ng-minlength="3" md-autofocus required-disabled>\n            <div ng-messages="form.username.$error" role="alert" ng-show="form.username.$dirty">\n              <div ng-message="required">Geben Sie einen Namen ein.</div>\n              <div ng-message="minlength">Der Name muss aus mindestens 3 Zeichen bestehen.</div>\n            </div>\n          </md-input-container>\n          <md-input-container>\n            <label>Passwort</label>\n            <input ng-model="$ctrl.user.password" name="password" type="password" required="" ng-minlength="3" required-disabled>\n  \n            <div ng-messages="form.password.$error" role="alert" ng-show="form.password.$dirty">\n              <div ng-message="required">Geben Sie ein Passwort ein.</div>\n              <div ng-message="minlength">Das Passwort muss aus mindestens 3 Zeichen bestehen.</div>\n            \n  \n            <div class="bi-alert md-block" ng-if="$ctrl.error" role="alert">\n              <span class="md-body-1" md-colors="{color: \'warn-500\'}">Bitte überprüfen Sie ihren Namen und das Passwort.</span>\n            </div>\n          </div></md-input-container>\n          <div layout="column">\n            <md-button type="submit" class="md-raised md-primary" ng-disabled="form.$invalid" ng-click="$ctrl.submit()">\n              LOGIN</md-button>\n          </div>\n          <br>\n          <md-button class="bi-reset-pw" ui-sref="forgot-password" md-no-ink="">Passwort zurücksetzen</md-button>\n        </md-content>\n      </form>\n    </div>\n  </div>\n  <cookie ng-if="!$ctrl.optIn" profile="$ctrl.user"></cookie>\t'),e.put("./app/routes/privacy-policy/el.html",'<div layout="column" layout-align="center" id="privacy-policy">\n  <md-card flex="100" flex-gt-sm="96" flex-gt-md="96" flex-gt-lg="70" layout-padding layout-margin ng-class="{\'in-layer\': $ctrl.layer}">\n    <md-card-content layout="column">\n      <h2 class="md-headline">Unsere Datenschutzerklärung</h2>\n      <p>Hier finden Sie Informationen über den Umgang mit Ihren personenbezogenen Daten beim Besuch unserer Website. Zur Bereitstellung\n        der Funktionen und Dienste unserer Website ist es erforderlich, dass wir personenbezogene Daten über Sie erheben.\n        Nachfolgend erklären wir, welche Daten wir über Sie erheben, wozu dies erforderlich ist, und welche Rechte Sie in\n        Bezug auf Ihre Daten haben. Verantwortlich für die Verarbeitung von personenbezogenen Daten auf dieser Website ist\n        (vgl. <a href="javascript:void" class="md-primary" ng-click="$ctrl.showImprint()" alt="Impressum">Impressum</a>):\n        <br>\n        </p><address>\n          <br>Plan.Net Business Intelligence GmbH & Co. KG\n          <br>Brienner Str. 45a-d, 80333 München / Deutschland\n          <br>Telefon: +49 89 2050 20\n          <br>Telefax: +49 89 2050 2111\n          <br>E-Mail: bi-ops(at)plan-net.com\n        </address>\n        <br> Sie können sich bei Fragen zum Datenschutz auch jederzeit unter\n        <a class="md-primary" href="mailto:privacy@plan-net.com">privacy(at)plan-net.com</a>\n        an unseren Datenschutzbeauftragten wenden.\n      <p></p>\n      <h2 class="md-headline">Informatorische Nutzung</h2>\n      <p>\n        Wenn Sie diese Website nutzen, ohne anderweitig (z.B. durch Registrierung oder Nutzung des Kontaktformulars) Daten an uns\n        zu übermitteln, erheben wir nur technisch notwendige Daten, die automatisch an unseren Server übermittelt werden\n        (z.B. IP-Adresse, Datum und Uhrzeit der Anfrage, Browsertyp und Betriebssystem). Dies ist technisch erforderlich,\n        um Ihnen unsere Website anzeigen zu können. Soweit davon personenbezogene Daten betroffen sind, ist Art. 6 Abs. 1\n        lit. f DSGVO Rechtsgrundlage für die Erhebung.\n      </p>\n      <h2 class="md-headline">Verwendung von Cookies</h2>\n      <p>\n        Wir verwenden Cookies, um die Benutzung unserer Website zu erleichtern und zu verbessern. Cookies sind Textinformationen,\n        die beim Besuch einer Website über den Webbrowser auf einem Computer gespeichert werden. Dies dient der Wiedererkennung\n        einer Sitzung, beispielsweise beim dauerhaften Login auf einer Website oder bei der Warenkorbfunktion eines Online-Shops.\n        Die meisten Webbrowser akzeptieren Cookies automatisch. Gespeicherte Cookies können Sie jederzeit über die Einstellungen\n        Ihres Webbrowsers löschen. Sie können auch die Einstellungen Ihres Webbrowsers so anpassen, dass keine Cookies gespeichert\n        werden. Dann sind unter Umständen nicht alle Funktionen unserer Website verfügbar.\n      </p>\n      <h2 class="md-headline">Kontaktformular</h2>\n      <p>\n        Auf unserer Website können Sie über ein Kontaktformular personenbezogene Daten eingeben. Wenn Sie das Kontaktformular nutzen,\n        erheben und speichern wir die Daten, die Sie in die Eingabemaske eingeben (z.B. Nachname, Vorname, E-Mail-Adresse).\n        Eine Weitergabe an Dritte findet nicht statt. Rechtsgrundlage für die Verarbeitung ist im Falle einer Einwilligung\n        Art. 6 Abs. 1 lit. a DSGVO. Dient Ihre Anfrage der Vorbereitung eines Vertragsabschlusses ist Art. 6 Abs. 1 lit.\n        b DSGVO zusätzliche Rechtsgrundlage. Die Daten verwenden wir ausschließlich, um Ihre Anfrage zu bearbeiten und zu\n        beantworten.\n      </p>\n      <h2 class="md-headline">Registrierung</h2>\n      <p>\n        Auf unserer Website können Sie sich registrieren. Wenn Sie sich registrieren, erheben und speichern wir die Daten, die Sie\n        in die Eingabemaske eingeben (z.B. Nachname, Vorname, E-Mail-Adresse). Eine Weitergabe an Dritte findet nicht statt.\n        Rechtsgrundlage für die Verarbeitung ist im Falle einer Einwilligung Art. 6 Abs. 1 lit. a DSGVO. Dient Ihre Registrierung\n        der Vorbereitung eines Vertragsabschlusses ist Art. 6 Abs. 1 lit. b DSGVO zusätzliche Rechtsgrundlage.Ihre Registrierung\n        ist für die Nutzung bestimmter Inhalte und Leistungen auf unserer Website erforderlich bzw. für die Erfüllung eines\n        Vertrags oder zur Durchführung vorvertraglicher Maßnahmen erforderlich.\n      </p>\n      <h2 class="md-headline">Kommentarfunktion </h2>\n      <p>\n        Auf unserer Website können Sie Beiträge kommentieren. Wenn Sie einen Beitrag kommentieren, erheben und speichern wir die\n        Daten, die Sie in die Eingabemaske eingeben (z.B. Nachname, Vorname, E-Mail-Adresse). Eine Weitergabe an Dritte findet\n        nicht statt. Rechtsgrundlage für die Verarbeitung ist im Falle einer Einwilligung Art. 6 Abs. 1 lit. a DSGVO. Die\n        Erhebung der Daten dient der Durchsetzung unserer Kommentierungs-Regeln.\n      </p>\n      <h2 class="md-headline">Speicherdauer</h2>\n      <p>\n        Wir verarbeiten und speichern Ihre Daten nur so lange, wie dies für die Verarbeitung oder zur Einhaltung gesetzlicher Pflichten\n        erforderlich ist. Nach Wegfall des Verarbeitungszwecks werden Ihre Daten gesperrt oder gelöscht. Sofern darüber hinaus\n        gesetzliche Pflichten zur Speicherung bestehen, sperren oder löschen wir Ihre Daten mit Ablauf der gesetzlichen Speicherfristen.\n      </p>\n      <h2 class="md-headline">Ihre Rechte</h2>\n      <p>\n\n        Sie haben bezüglich der Sie betreffenden personenbezogenen Daten folgende gesetzliche Rechte gegenüber uns:\n        <ol>\n          <li>\n            Auskunftsrecht\n            <br> Sie haben als betroffene Person das Recht, eine Bestätigung darüber zu verlangen, ob wir personenbezogene Daten\n            verarbeiten, die Sie betreffen. Ist dies der Fall, so haben Sie das Recht auf Auskunft über diese personenbezogenen\n            Daten sowie auf weitere Informationen, z.B. die Verarbeitungszwecke, die Empfänger und die geplante Dauer der\n            Speicherung bzw. die Kriterien für die Festlegung der Dauer.\n          </li>\n          <li>\n            Recht auf Berichtigung und Vervollständigung\n            <br> Sie haben als betroffene Person das Recht, unverzüglich die Berichtigung unrichtiger Daten zu verlangen. Unter\n            Berücksichtigung der Zwecke der Verarbeitung haben Sie das Recht, die Vervollständigung unvollständiger Daten\n            zu verlangen.\n          </li>\n          <li>\n            Recht auf Löschung („Recht auf Vergessenwerden“)\n            <br> Sie haben als betroffene Person ein Recht zur Löschung, soweit die Verarbeitung nicht erforderlich ist. Dies\n            ist beispielsweise der Fall, wenn Ihre Daten für die ursprünglichen Zwecke nicht mehr notwendig sind, sie Ihre\n            datenschutzrechtliche Einwilligungserklärung widerrufen haben oder die Daten unrechtmäßig verarbeitet wurden.\n          </li>\n          <li>\n            Auskunftsrecht\n            <br> Sie haben als betroffene Person das Recht, eine Bestätigung darüber zu verlangen, ob wir personenbezogene Daten\n            verarbeiten, die Sie betreffen. Ist dies der Fall, so haben Sie das Recht auf Auskunft über diese personenbezogenen\n            Daten sowie auf weitere Informationen, z.B. die Verarbeitungszwecke, die Empfänger und die geplante Dauer der\n            Speicherung bzw. die Kriterien für die Festlegung der Dauer.\n          </li>\n          <li>\n            Recht auf Einschränkung der Verarbeitung\n            <br> Sie haben als betroffene Person ein Recht auf Einschränkung der Verarbeitung, z.B. wenn Sie der Meinung sind,\n            die personenbezogenen Daten seien unrichtig.\n          </li>\n\n          <li>\n            Recht auf Datenübertragbarkeit\n            <br> Sie haben als betroffene Person das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten,\n            gängigen und maschinenlesbaren Format zu erhalten.\n          </li>\n          <li>\n            Widerspruchsrecht\n            <br> Sie haben als betroffene Person das Recht, jederzeit aus Gründen, die sich aus Ihrer besonderen Situation ergeben,\n            gegen die Verarbeitung bestimmter Sie betreffender personenbezogener Daten Widerspruch einzulegen. Im Falle von\n            Direktwerbung haben Sie als betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender\n            personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es\n            mit solcher Direktwerbung in Verbindung steht.\n          </li>\n          <li>\n            Recht auf Widerruf Ihrer datenschutzrechtlichen Einwilligung\n            <br> Sie können eine Einwilligung in die Verarbeitung Ihrer personenbezogenen Daten jederzeit mit Wirkung für die\n            Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung wird davon jedoch nicht berührt.\n          </li>\n        </ol>\n        <br> Außerdem können Sie jederzeit Beschwerde bei einer Datenschutzaufsichtsbehörde einlegen, wenn Sie der Meinung sind,\n        dass die Datenverarbeitung nicht im Einklang mit datenschutzrechtlichen Vorschriften steht.\n\n      </p>\n    </md-card-content>\n\n  </md-card>\n\n</div>\n'),e.put("./app/routes/reset-password/el.html",'<div layout="column" layout-align-xs="start center" layout-align-gt-xs="center center" layout-fill="layout-fill" id="login" class="reset">\n  <h1 class="bi-powered">POWERED BY CORE</h1>\n  <div class="login-box md-whiteframe-z2" layout="column">\n    <form name="form" novalidate ng-submit="$ctrl.submit($event)">\n      <md-content class="md-padding" layout="column">\n        <h2>\n          Neues Passwort\n        </h2>\n        <md-input-container class="md-block">\n          <label>Neues Passwort</label>\n          <input ng-model="$ctrl.user.password" name="password" type="password" required ng-minlength="3" ng-disabled="$ctrl.error.password_code">\n          <div ng-messages="form.password.$error" role="alert" ng-if="form.password.$dirty">\n            <div ng-message="required">Geben Sie ein neues Passwort ein.</div>\n            <div ng-message="minlength">Das Passwort muss aus mindestens 6 Zeichen bestehen.</div>\n          </div>\n        </md-input-container>\n        <md-input-container class="md-block">\n          <label>Passwort wiederholen</label>\n          <input ng-model="$ctrl.confirmPassword" name="confirmPassword" type="password" required ng-disabled="$ctrl.error.password_code" ng-minlength="3" compare-to="$ctrl.user.password">\n          <div ng-messages="form.confirmPassword.$error" role="alert" ng-if="form.confirmPassword.$dirty">\n            <div ng-message="required">Geben Sie ein neues Passwort ein.</div>\n            <div ng-message="minlength">Das Passwort muss aus mindestens 6 Zeichen bestehen.</div>\n            <div ng-message="compareTo">Die Passwörter müssen übereinstimmen.</div>\n\n          </div>\n          <br>\n          <div class="c-alert md-block" ng-if="$ctrl.error">\n            <ul style="margin:0;list-style:none;padding:0">\n              <li ng-if="$ctrl.error.length">\n                <p>Password to weak</p>\n                </li>\n              <li ng-repeat="(key, value) in $ctrl.error">\n                <p>{{value}}</p>\n              </li>\n            </ul>\n            <br>\n            <a href="#" ui-sref="forgot-password" ng-if="$ctrl.error.password_code">Create new token</a>\n          </div>\n        </md-input-container>\n\n        <md-button type="submit" class="md-raised md-primary" ng-disabled="form.$invalid || $ctrl.error.password_code">Weiter\n        </md-button>\n      </md-content>\n\n    </form>\n  </div>\n  <div class="bi-copyright"><span>&copy; 2017</span></div>\n</div>\n')}]);