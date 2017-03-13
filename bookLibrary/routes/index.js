var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var mongoose = require('mongoose'); // Importing Mongoose
var ObjectId = require('mongoose').Types.ObjectId;
var Book = mongoose.model('Book');
var Transaction = mongoose.model('Transaction');

/* REST Routes */
// Creating GET route for retrieving books, returns JSON list containing all books
// Use express get()  method to define URL for route (/posts)
router.get('/books', function(req, res, next) { 
  Book.find(function(err, books){  // Query database for all books
    if(err){ return next(err); } // Pass error to error-handling function 
    
      res.json(books); // Send retrieved books back to client
  });   
});

 // Creating book object
router.post('/books', function(req, res, next) {
  
  var book = new Book(req.body);
  book.save(function(err, book){
    if(err){ return next(err); }
    console.log("New book created");
    res.json(book);
  });
});


// For editing the number of books of a selected book in the database
router.put('/books/:id', function(req, res, next){
  var id = req.params.id;
  console.log("Book being edited in express route: "+ req.body.numOfBooks);
  Book.findOneAndUpdate({_id: new ObjectId(id)},{$set:{numOfBooks: req.body.numOfBooks}},{new : true},
  function(err, result) {
    if(err){ return next(err); }
    res.json(result);
  });
});

// Delete selected book from the list by finding by ObjectId which is the unique value assigned
router.delete('/books/:id', function(req, res, next) {
  var id = req.params.id;

  Book.remove({_id: new ObjectId(id)}, function(err, result) {
    console.log("Deleted book with id: " + id);
    res.send(result);
  });
});

// Retrieving specific book to edit
router.get('/books/:id', function(req, res, next){
  var id = req.params.id;
  console.log("get for single book:"+ id);
  Book.findOne({_id: new ObjectId(id)}, function(err, result) {
    res.send(result);
  });
});

//pre-loading post objects
router.param('book', function(req, res, next, id){
  var query = Book.findById(id);

  query.exec(function(err, book){
    if (err) { return next (err); }
    if(!book) { return next(new Error('can\'t find book')); }

    req.book = book;
    return next();
  });
});

// Creating GET route for retrieving transactions, returns JSON list containing all transactions
// Use express get()  method to define URL for route (/posts)
router.get('/transactions', function(req, res, next) { 
  Transaction.find(function(err, transactions){  // Query database for all transactions
    if(err){ return next(err); } // Pass error to error-handling function

    res.json(transactions); // Send retrieved transactions back to client
  });
});

