var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var mongoose = require('mongoose'); // Importing Mongoose
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

    res.json(book);
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

