var express = require('express');
var router = express.Router();

router.get('/books', function (req, res, next) {

    let search = req.query.search;
    let minprice = req.query.minprice;
    let maxprice = req.query.maxprice;
    let sort = req.query.sort;

    let sqlquery = "SELECT * FROM books WHERE 1=1";

    if (search) {
        sqlquery += ` AND name LIKE '%${search}%'`;
    }

    if (minprice && maxprice) {
        sqlquery += ` AND price BETWEEN ${minprice} AND ${maxprice}`;
    }

    // Sorting
    if (sort === "name") {
        sqlquery += " ORDER BY name ASC";
    } 
    else if (sort === "price") {
        sqlquery += " ORDER BY price ASC";
    }

    db.query(sqlquery, (err, result) => {
        if (err) {
            res.json(err);
            next(err);
        } else {
            res.json(result);
        }
    });
});



module.exports = router;
