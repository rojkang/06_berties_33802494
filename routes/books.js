// Create a new router
const express = require("express")
const router = express.Router()
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('../users/login');
    } else {
        next();
    }
};

// ----------------------------
//  SEARCH PAGE
// ----------------------------
router.get('/search', function(req, res, next){
    res.render("search.ejs")
});

router.get('/search_result', function (req, res, next) {
     let keyword = req.sanitize(req.query.search_text);

    let sqlquery = "SELECT * FROM books WHERE name = ?";
    
    db.query(sqlquery, [keyword], (err, result) => {
        if (err) return next(err);
        res.render("searchresults.ejs", { results: result });
    });
});



// ----------------------------
//  LIST BOOKS
// ----------------------------
router.get('/list',redirectLogin, function(req, res, next) {
    let sqlquery = "SELECT * FROM books"; 
    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render("list.ejs", { availableBooks: result });
    });
});


// ----------------------------
//  SHOW ADD BOOK FORM
// ----------------------------
router.get('/addbook',redirectLogin, function(req, res, next) {
    res.render("addbook.ejs");
});


// ----------------------------
//  INSERT BOOK INTO DATABASE
// ----------------------------
router.post('/bookadded',redirectLogin, function (req, res, next) {
let newName = req.sanitize(req.body.name);
let newPrice = req.sanitize(req.body.price);

let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
let newrecord = [newName, newPrice];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) return next(err);

        res.send(
            'This book is added to database, name: ' +
            newName + ' price ' + newPrice 
        );
    });
});
router.get('/bargainbooks',redirectLogin, function(req, res, next) {
    let sqlquery = "SELECT * FROM books WHERE price < 20";

    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render("bargainbooks.ejs", { cheapBooks: result });
    });
});

module.exports = router
