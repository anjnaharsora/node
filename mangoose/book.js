/**
 * Created by lcom23_two on 1/21/2017.
 */
var mongoose = require('mongoose');
var dbHost = 'mongodb://localhost:27017/dataTable';
mongoose.connect(dbHost);
//Create a schema for Book
var bookSchema = mongoose.Schema({
    name: String,
    //Also creating index on field isbn
    isbn: {type: String, index: true},
    author: String,
    pages: Number
});

var Book = mongoose.model('Book', bookSchema, "mongoose_demo");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to DB");

    var book1 = new Book({
        name:"Mongoose Demo 1",
        isbn: "MNG123",
        author: "Author1,  Author2",
        pages: 123
    });

    book1.save(function(err){
        if ( err ) throw err;
        console.log("Book Saved Successfully");
    });

    var book2 = new Book({
        name:"Mongoose Demo 2",
        isbn: "MNG124",
        author: "Author2,  Author3",
        pages: 90
    });

    book2.save(function(err){
        if ( err ) throw err;
        console.log("Book Saved Successfully");
        deleteBook();
    });

    var book3 = new Book({
        name:"Mongoose Demo 3",
        isbn: "MNG125",
        author: "Author2,  Author4",
        pages: 80
    });

    book3.save(function(err){
        if ( err ) throw err;
        console.log("Book Saved Successfully");
        queryBooks();
        updateBook();

    });

});

var queryBooks = function(){
    Book.find({pages : {$lt:100}}, "name isbn author pages", function(err, result){
        if ( err ) throw err;
        console.log("Find Operations: " + result);
    });
};

var updateBook = function(){
    Book.update({isbn : {$eq: 'MNG125'}}, {$set: {name: "Mongoose Demo 3.1"}}, function(err, result){
        console.log("Updated successfully");
        console.log(result);
    });
};

var deleteBook = function(){
    Book.remove({isbn:{$eq: 'MNG124'}}).exec();
};