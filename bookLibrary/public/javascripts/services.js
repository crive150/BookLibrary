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
  };
  // Creating a book
  o.create = function(book) {
    return $http.post('/books', book).success(function(data) {
      o.books.unshift(data); // .unshift method adds to the beginning of the array
    })
  };

  o.edit = function(id, index, numOfBooks) {
    return $http.put('/books' + id + '/numOfBooks').success(function(data){
      o.books[index].numOfBooks = numOfBooks;
      console.log('edit gets to service');
    })
  };

  // Deleting a specific book identified by the _id and by index in the array in services
  o.delete = function(id, index) { 
    return $http.delete('/books/' + id).success(function(data){
      o.books.splice(index, 1);
    })
  };

  return o;
}]);
