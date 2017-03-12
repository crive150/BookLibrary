var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    title: String, 
    authorName: String,
    ISBN: String, 
    numOfBooks: {type: Number, default: 1}, 
    publishDate: String,
    bookCat: String, 
    numBooksIssued: {type: Number, default: 0},
});

BookSchema.methods.edit = function(cb) {
    this.numBooksIssued = cb;
    this.save(cb);
}

mongoose.model('Book', BookSchema);