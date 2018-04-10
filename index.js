const express = require('express');
const app = express();

/** Dependencies **/
const crypto = require("crypto");
const { Person, Trip, TripList } = require("./db/db.js");

/** Config and Globals **/

app.use(express.json());
app.use(express.urlencoded());

const unknownErrorMessage = "An error occurred.";

/** Core Stuff **/
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', (req, res) => {

});

app.post('/login', (req, res) => {

});

/** Rest API **/

/** People REST **/

app.get('/api/v1/people', (req, res) => {
    Person.find(req.body, function (err, docs) {
        if(err) {
            res.json({error: true, message: err}).end();
        } else {
            res.json(docs).end();
        }
    });
});

app.post('/api/v1/people', (req, res) => {
    Person.find(req.body, function(err, docs) {
       if(err) {
           res.json({error: true, message: unknownErrorMessage}).end();
       } else {
           if(docs.length > 0) {
               res.json({error: true, message: "Record already exists."}).end();
           } else {
               const instance = new Person(req.body);
               instance.save();
               res.json({error: false, message: instance}).end();
           }
       }
    });
});

app.put('/api/v1/people', (req, res) => {
    Person.find(req.body, function(err, docs) {
        if(err) {
            res.json({error: true, message: unknownErrorMessage}).end();
        } else {
            Person.update(req.body._id, {$set: req.body});
            res.json({error: false, message: "Updated."}).end();
        }
    });
});

app.delete('/api/v1/people', (req, res) => {
    Person.find(req.query, function(err, person) {
        if(err) {
            res.json({error: true, message: unknownErrorMessage}).end();
        } else {
            person[0].remove();
            res.json({error: false, message: "Removed."}).end();
        }
    });
});

/** Trips REST **/
app.get('/api/v1/trips', (req, res) => {
    Trip.find(req.body, function (err, docs) {
        if(err) {
            res.json({error: true, message: err}).end();
        } else {
            res.json(docs).end();
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