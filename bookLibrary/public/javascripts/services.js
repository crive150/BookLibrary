// Angular Factories/Services
// Returns contents of JSON file to the Controller

// Books Factory
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

  // Begins the edit on the desired book
  o.edit = function(id) {
    console.log("Editing book with id:" + id);
     return $http.get('/books/' + id).then(function(res){     
      return res.data;
    })
  };

  // Complete change by changing the value through the route
  o.update = function(id, book, index) {
    console.log("Updating book in factory");
    return $http.put('/books/' + id, book).success(function(res){
      o.books[index].numOfBooks = book.numOfBooks;
    })
  };

  // Deleting a specific book identified by the _id and by index in the array in services
  o.delete = function(id, index) { 
    return $http.delete('/books/' + id).success(function(data){
      o.books.splice(index, 1);
    })
  };

  o.issue = function(id ,book, index) {
    return $http.put('/books/' + id + '/issue', book).success(function(data){
      })
  };

  o.return = function(id ,book, index) {
    return $http.put('/books/' + id + '/issue', book).success(function(data){
      })
  };

  return o;
}]);

/*-------------------------Transactions Factory-------------------------*/
app.factory('transactions', ['$http', function($http){
  var o = {
    transactions: []
  };

o.getAllTransactions = function() {
    return $http.get('/transactions').success(function(data) {
      console.log(data);
      angular.copy(data, o.transactions);
    })
  };

  // Creating a transaction
  o.createTransaction = function(transaction) { 
    return $http.post('/transactions', transaction).success(function(data) {
      console.log(data);
      o.transactions.push(data);
    })
  };

  o.deleteTransaction = function(id, index) { 
    return $http.delete('/transactions/' + id).success(function(data){
      o.transactions.splice(index, 1);
    })
  };

  // Begins the edit on the desired book
  o.editTransaction = function(id) {
    console.log("Editing transaction with id:" + id);
     return $http.get('/transactions/' + id).then(function(res){     
      return res.data;
    })
  };

  // Complete change by changing the value through the route
  o.updateTransaction = function(id, transaction, index) {
    console.log("Updating transaction in factory");
    return $http.put('/transactions/' + id, transaction).success(function(res){
      o.transactions[index] = transaction;
    })
  };

  return o;
}]);