// Angular Factories/Services
app.factory('books', ['$http', function($http){
  var o = {
    books: [],
    transactions: []
  };
  
  o.getAll = function() {
    return $http.get('/books').success(function(data) {
      angular.copy(data, o.books);
    })
  }

  o.create = function(book) {
    return $http.post('/books', book).success(function(data) {
      o.books.push(data);
    })
  }

  // Transactions
  // o.getAll = function() {
  //   return $http.get('/books').success(function(data) {
  //     angular.copy(data, o.transactions);
  //   })
  // }

  // o.create = function(book) {
  //   return $http.post('/books', transaction).success(function(data) {
  //     o.transactions.push(data);
  //   })
  // }


  return o;
}]);