// Angular Controllers
app.controller('MainCtrl', [
'$scope',
'books',
function($scope, books){
  
  $scope.books = books.books;
  
  //transaction: {bookID:'book 1', transDate: '02/14/17', transType: 'return', Date:'02/14/17'}
  // Adds to book to list of books
  $scope.add = function() {
    if(!$scope.title || $scope.title === '') { return; }
    books.create({ // Saves book to server
      title: $scope.title,
      authorName: $scope.authorName,
      ISBN: $scope.ISBN,
      numOfBooks: $scope.numOfBooks,
      publishDate: $scope.publishDate,
      bookCat: $scope.bookCat,
      numBooksIssued: $scope.numBooksIssued
    });
    $scope.title = '';
    $scope.authorName ='';
    $scope.ISBN ='';
    $scope.numOfBooks ='';
    $scope.publishDate ='';
    $scope.bookCat = '';
    $scope.numBooksIssued = '';
  }

  $scope.SelectedBook = null;
  $scope.setSelected = function (SelectedBook) {
    $scope.SelectedBook = SelectedBook;
    console.log($scope.SelectedBook._id);
  }

  // Delete the selected book
  $scope.delete = function() {
    if($scope.SelectedBook === null){
      window.alert("You have not selected any book yet!");
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
  }
  // Edit number of books
  $scope.edit = function() { 
    if($scope.SelectedBook === null){
      window.alert("You have not selected any book yet!");
    }
    else {
      console.log("Editing: "+$scope.SelectedBook._id);
      console.log(books.edit($scope.SelectedBook._id));
      //$scope.numOfBook = 
      
    }
  };

  // Adds book to bottom list until their quantity is ran out
  // $scope.added = [];
  // $scope.add = function(SelectedBook) {
  //   if(SelectedBook.numOfBooks === 0){
  //     window.alert(SelectedBook.numOfBooks);
  //   }
  //   else {
  //     var exists = false;
  //     for(var i = 0; i < $scope.added.length; i++) {
  //       if($scope.added[i].title == SelectedBook.title) {
  //         exists = true;
  //       }
  //     }
  //     if(!exists) {
  //       $scope.added.push($scope.SelectedBook);
  //       $scope.SelectedBook.numOfBooks -= 1;
  //       $scope.SelectedBook.numBooksIssued += 1;
  //       console.log("Added new book");
  //     }
  //     else {
  //       $scope.SelectedBook.numOfBooks -= 1;
  //       $scope.SelectedBook.numBooksIssued += 1;
  //       console.log("Added quantity");
  //     }
  //   }
  //   console.log($scope.added.toString());
  // }

}]);
