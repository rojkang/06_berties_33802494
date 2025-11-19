// Create a new router
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Show login page
router.get('/login', function(req, res, next) {
    res.render('login.ejs');
});

// Registration page
router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

// List all users
router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT username, first, last, email FROM users";

    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.render("listusers.ejs", { users: result });
        }
    });
});

router.get('/audit', function(req, res, next) {
    db.query("SELECT * FROM auditlog ORDER BY timestamp DESC", (err, result) => {
        if (err) {
            next(err);
        } else {
            res.render("audit.ejs", { logs: result });
        }
    });
});

// Handle registration
router.post('/registered', function (req, res, next) {

    const plainPassword = req.body.password;

    // Hash the password BEFORE storing it
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if (err) {
            next(err);
        } else {

            // Insert user into database
            let sqlquery = "INSERT INTO users (username, first, last, email, hashedPassword) VALUES (?,?,?,?,?)";

            let newrecord = [
                req.body.username,
                req.body.first,
                req.body.last,
                req.body.email,
                hashedPassword
            ];

            db.query(sqlquery, newrecord, (err, result) => {
                if (err) {
                    next(err);
                } else {

                    // Debug output (ONLY for the lab)
                    let message = '';
                    message += 'Hello ' + req.body.first + ' ' + req.body.last + ', you are now registered! ';
                    message += 'We will send an email to you at ' + req.body.email + '<br><br>';
                    message += 'Your password is: ' + req.body.password + '<br>';
                    message += 'Your hashed password is: ' + hashedPassword;

                    res.send(message);
                }
            });
        }
    });
});

// Handle login
// Handle login
router.post('/loggedin', function(req, res, next) {

    let username = req.body.username;
    let password = req.body.password;

    // Step 1: Select user from database
    let sqlquery = "SELECT * FROM users WHERE username = ?";

    db.query(sqlquery, [username], (err, result) => {
        if (err) {
            next(err);
        } else if (result.length === 0) {

            // Log failed attempt (username not found)
            db.query(
                "INSERT INTO auditlog (username, action, details) VALUES (?, 'FAILED', 'Username not found')",
                [username]
            );

            res.send("Login failed: username not found.");

        } else {

            let hashedPassword = result[0].hashedPassword;

            bcrypt.compare(password, hashedPassword, function(err, match) {
                if (err) {
                    next(err);
                } else if (match === true) {

                    // Log success
                    db.query(
                        "INSERT INTO auditlog (username, action, details) VALUES (?, 'SUCCESS', 'Correct password')",
                        [username]
                    );

                    res.send("Login successful! Welcome " + username);

                } else {

                    // Log failed attempt (wrong password)
                    db.query(
                        "INSERT INTO auditlog (username, action, details) VALUES (?, 'FAILED', 'Wrong password')",
                        [username]
                    );

                    res.send("Login failed: incorrect password.");
                }
            });

        }
    });
});


// Export for index.js
module.exports = router;
