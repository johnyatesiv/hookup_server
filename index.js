const express = require('express');
const app = express();

/** Dependencies **/
const crypto = require("crypto");
const { Person, Trip, TripList } = require("./db/db.js");

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
            res.json({error: true, message: err});
        } else {
            res.json(docs);
        }

        res.end();
    });
});

app.post('/api/v1/people', (req, res) => {
    const instance = new Person(req.body);
    instance.save();
    res.json({error: false, message: "Saved."}).end();
});

app.put('/api/v1/people', (req, res) => {
    Person.find({_id: req.body._id}, function(err, docs) {
        for(var i in req.body) {
            docs[0][i] = req.body[i];
        }

        docs[0].save();
        res.json({error: false, message: "Updated."}).end();
    });
});

app.delete('/api/v1/people', (req, res) => {

});

/** Trips REST **/
app.get('/api/v1/trips', (req, res) => {
    Trip.find(req.body, function (err, docs) {
        if(err) {
            res.json({error: true, message: err});
        } else {
            res.json(docs);
        }

        res.end();
    });
});

app.post('/api/v1/trips', (req, res) => {
    const instance = new Trip(req.body);
    instance.save();
    res.json({error: false, message: "Saved."}).end();
});

app.put('/api/v1/trips', (req, res) => {

});

app.delete('/api/v1/trips', (req, res) => {

});

app.listen(3000, () => {
    console.log('HookUp server ready to go on port 3000!')
});