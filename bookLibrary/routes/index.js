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
// Creating GET route for retrieving posts, returns JSON list containing all posts
// Use express get()  method to define URL for route (/posts)
router.get('/books', function(req, res, next) { 
  Book.find(function(err, books){  // Query database for all posts
    if(err){ return next(err); } // Pass error to error-handling function

    res.json(books); // Send retrieved posts back to client
  });
});

router.post('/books', function(req, res, next) {
  var book = new Book(req.body);

  book.save(function(err, book){
    if(err){ return next(err); }

    res.json(book);
  });
});