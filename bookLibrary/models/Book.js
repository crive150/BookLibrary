var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    title: String, 
    authorName: String,
    ISBN: String, 
    numOfBooks: {type: Number, default: 1}, 
    publishDate: String,
    bookCat: String, 
    numBooksIssued: {type: Number, default: 0}


});

mongoose.model('Book', BookSchema);