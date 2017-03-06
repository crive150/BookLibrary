// Angular Controllers
app.controller('MainCtrl', [
'$scope',
'books',
function($scope, books){
  $scope.books = books.books;
  $scope.transactions = books.transactions;
  //transaction: {bookID:'book 1', transDate: '02/14/17', transType: 'return', Date:'02/14/17'}
  // Adds to transaction list
  $scope.add = function(book) {
    book.numOfBooks -= 1;
    book.numBooksIssued += 1;
  }

  // Delete from transaction list
  $scope.delete = function(book) {
    book.numOfBooks += 1;
    book.numBooksIssued -= 1;
  }
  // Edit from transaction list
  $scope.edit = function(book) {
    
  };
}]);