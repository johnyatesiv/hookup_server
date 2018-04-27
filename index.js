const express = require('express');
const app = express();

/** Dependencies **/
const crypto = require("crypto");
const { User, Trip } = require("./db/db.js");
const fixtures = require("./db/fixtures.js");

/** Config and Globals **/
const salt = "5a1`3f!e6#@8#94)9e7!@!c97k15f";

/** Helpers **/
sha512 = (password, salt) => {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');
};

genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
};

app.use(express.json());
app.use(express.urlencoded());

const unknownErrorMessage = "An error occurred.";

/** Core Stuff **/
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', (req, res) => {
    req.body.password = sha512(req.body.password, salt);
    req.body.token = genRandomString(64);
    User.create(req.body, function(err, docs) {
       if(err) {
           res.json({error: true, message: "Failed to register.", payload: {token: req.body.token}});
       } else {
           res.json({error: false, message: "Registered.", payload: {token: req.body.token}});
       }

       res.end();
    });
});

app.post('/authenticate', (req, res) => {
    const hashed = sha512(req.body.password, salt);
    const query = {email: req.body.email.toLowerCase(), password: hashed};

    console.dir(query);

    User.find(query, function(err, docs) {
        console.log(err);
        console.log(docs);
        if(err || docs.length == 0) {
            res.json({error: true, message: "Failed to log in."});
            res.end();
        } else {
            const token = genRandomString(64);
            User.update(query, {$set: {token: token}}, function(err, docs) {
            if(err) {
               res.json({error: true, message: "Failed to generate auth token."});
               res.end();
            } else {
               res.json({error: false, message: "Logged in.", payload: {token: token}});
               res.end();
            }
            });
        }
    });
});

/** Rest API **/

/** User Methods **/

/** Trips REST **/
app.get('/api/v1/trips', (req, res) => {
    Trip.find(req.body, function (err, docs) {
        if(err) {
            res.json({error: true, message: err}).end();
        } else {
            res.json({error: false, message: "Found Trips", payload: docs}).end();
        }
    });
});

app.post('/api/v1/trips', (req, res) => {
    Trip.find(req.body, function(err, docs) {
        if(err) {
            res.json({error: true, message: unknownErrorMessage}).end();
        } else {
            if(docs.length > 0) {
                res.json({error: true, message: "Record already exists."}).end();
            } else {
                const instance = new Trip(req.body);
                instance.save();
                res.json({error: false, message: instance}).end();
            }
        }
    });
});

app.put('/api/v1/trips', (req, res) => {

});

app.delete('/api/v1/trips', (req, res) => {

});

app.listen(3000, () => {
    console.log('HookUp server ready to go on port 3000!')
});
