// Angular Controllers
app.controller('MainCtrl', [
'$scope',
'books',
function($scope, books){
  $scope.books = books.books;
  $scope.added = [];
 
  //transaction: {bookID:'book 1', transDate: '02/14/17', transType: 'return', Date:'02/14/17'}
  // Adds to transaction list
  $scope.idSelectedBook = null;
  $scope.idSelectedAddedBook = null;

  $scope.setSelected = function (idSelectedBook) {
    $scope.idSelectedBook = idSelectedBook;
  }

  $scope.setSelectedAdded = function (idSelectedAddedBook) {
    $scope.idSelectedAddedBook = idSelectedAddedBook;
  }

  $scope.add = function(idSelectedBook) {
    $scope.added.push({book: $scope.idSelectedBook});
    $scope.idSelectedBook.numOfBooks -= 1;
    $scope.idSelectedBook.numBooksIssued += 1;
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
