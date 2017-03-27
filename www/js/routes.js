angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.scan', {
    url: '/scan',
    views: {
      'tab1': {
        templateUrl: 'templates/scan.html',
        controller: 'scanCtrl'
      }
    }
  })

  .state('tabsController.history', {
    url: '/history',
    views: {
      'tab2': {
        templateUrl: 'templates/history.html',
        controller: 'historyCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/scan')

  

});