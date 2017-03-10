// Angular Factories/Services
// Returns contents of JSON file to the Controller
app.factory('books', ['$http', function($http){
  var o = {
    books: []
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

  o.get = function (id) { 
    return $http.get('/books' + id).then(function (res){
      return res.data;
    })
  }

  return o;
}]);
