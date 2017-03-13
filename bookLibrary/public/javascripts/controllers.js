// Angular Controllers

// Controller for Books list
app.controller('BookCtrl', [
'$scope',
'books',
function($scope, books){
  
  $scope.books = books.books;
  
  //transaction: {bookID:'book 1', transDate: '02/14/17', transType: 'return', Date:'02/14/17'}
  // Adds to book to list of books
  $scope.add = function() {
    if(!$scope.book.title || $scope.book.title === '') { 
      window.alert("Your book requires a title!");
      return; 
      }
    if($scope.book.numOfBooks < 0 || $scope.book.numBooksIssued < 0){
      window.alert("Number of books or number of books issued cannot be negative.");
      return;
    }
    if($scope.book.numOfBooks < $scope.book.numBooksIssued){
      window.alert("Number of books cannot be less than number of books issued.");
      return;
    }
    books.create({ // Saves book to server
      title: $scope.book.title,
      authorName: $scope.book.authorName,
      ISBN: $scope.book.ISBN,
      numOfBooks: $scope.book.numOfBooks,
      publishDate: $scope.book.publishDate,
      bookCat: $scope.book.bookCat,
      numBooksIssued: $scope.book.numBooksIssued
    });
    $scope.book.title = '';
    $scope.book.authorName ='';
    $scope.book.ISBN ='';
    $scope.book.numOfBooks ='';
    $scope.book.publishDate ='';
    $scope.book.bookCat = '';
    $scope.book.numBooksIssued = '';
  };
  // Below is the book selected on by click on the row which then highlights it
  $scope.SelectedBook = null;
  $scope.setSelected = function (SelectedBook) {
    $scope.SelectedBook = SelectedBook;
    console.log($scope.SelectedBook._id);
  };

  // Delete the selected book
  $scope.delete = function() {
    // if($scope.SelectedBook.numBooksIssued != 0){ 
    //   window.alert("Number of books issued must be 0 before taking this action.");
    //   return;
    // }
    if($scope.SelectedBook == null){
      window.alert("Please select a book before taking this action.");
      return;
    }
    else {
      // Holds index to delete from service and immediately update client-side
      var index;
      for(var i = 0; i < books.books.length; i++) {
        if(books.books[i]._id === $scope.SelectedBook._id) {
          index = i;
          }
        } // Passes index, id to service then id to routes to delete from DB
        books.delete($scope.SelectedBook._id, index); 
        $scope.SelectedBook = null;
    }
  };

  // Edit number of books. This method caputes the book details and places them in the boxes for editing
  $scope.edit = function() { 
    if($scope.SelectedBook == null){
      window.alert("Please select a book before taking this action.");
    }
    else {
      books.edit($scope.SelectedBook._id).then(function(data){
        $scope.book = data;
      });  
    }
  };

  // Update method updates the database with the new value for number of books in the text box.
  $scope.update = function() {
    if($scope.book == null) {
      window.alert("Please select a book and then hit edit before hitting update.");
    }
    else {
      // Holds index to modify array from service and immediately update client-side
        var index;
        for(var i = 0; i < books.books.length; i++) {
          if(books.books[i]._id === $scope.book._id) {
            index = i;
            }
          }
      if($scope.book.numOfBooks < $scope.book.numBooksIssued){
        window.alert("Number of books cannot be less than number of books issued.");
        return;
      }
      books.update($scope.book._id, $scope.book ,index);
      $scope.book = null;
      $scope.SelectedBook = null;
    }
  };

  $scope.issue = function (){

  };

}]);


// Controller for Transactions list
app.controller('TransCtrl', [
'$scope',
'transactions',
function($scope, transactions) {
  //$scope.transactions = transactions.transactions;

}]);