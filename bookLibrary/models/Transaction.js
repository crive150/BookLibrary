var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
    bookID: String, 
    transDate: String, 
    transType: String, 
    Date: String
});

mongoose.model('Transaction', TransactionSchema);