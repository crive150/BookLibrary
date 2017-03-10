// Angular State Routing
// Change url based on state(like a state machine)
// Configuring our ui-router. $stateProvider and $urlRouterProvider used to set up home router and home state
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider)
  {
    $stateProvider // :
    // States and their nested views
                  .state('home', {
                  url: '/home',
                  templateUrl: '/home.html',
                  controller: 'MainCtrl',
                  resolve: { // Resolve is used because anytime home state is entered, it queries for all books
                     bookPromise: ['books', function(books) { // from the backend before the state finished loading.
                        return books.getAll();
                    }]
                  }
                });                     
      $urlRouterProvider.otherwise('home');
}]);