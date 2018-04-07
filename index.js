const express = require('express');
const app = express();

/** Dependencies **/
import crypto from "crypto";
import { Person, Trip, TripList } from "./db/db.js";

/** Core Stuff **/
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/register', (req, res) => {

});

app.post('/login', (req, res) => {

});

/** Rest API **/

/** People REST **/

app.get('/people', (req, res) => {
    Person.find(req.body, function (err, docs) {
        if(err) {
            res.json({error: true, message: err});
        } else {
            res.json(docs);
        }

        res.end();
    });
});

app.post('/people', (req, res) => {
    const instance = new Person(req.body);
    instance.save();
    res.json({error: false, message: "Saved."}).end();
});

app.put('/people', (req, res) => {
    Person.find({_id: req.body._id}, function(err, docs) {
        for(var i in req.body) {
            docs[0][i] = req.body[i];
        }

        docs[0].save();
        res.json({error: false, message: "Updated."}).end();
    });
});

app.del('/people', (req, res) => {

});

/** Trips REST **/
app.get('/trips', (req, res) => {
    Trip.find(req.body, function (err, docs) {
        if(err) {
            res.json({error: true, message: err});
        } else {
            res.json(docs);
        }

        res.end();
    });
});

app.post('/trips', (req, res) => {
    const instance = new Trip(req.body);
    instance.save();
    res.json({error: false, message: "Saved."}).end();
});

app.put('/trips', (req, res) => {

});

app.del('/trips', (req, res) => {

});

/** TripList REST **/

app.get('/tripList', (req, res) => {
    TripList.find(req.body, function (err, docs) {
        if(err) {
            res.json({error: true, message: err}).end();
        } else {
            res.json(docs).end();
        }
    });
});

app.post('/tripList', (req, res) => {
    const instance = new TripList(req.body);
    instance.save();
    res.json({error: false, message: "Saved."}).end();
});

app.put('/tripList', (req, res) => {
    TripList.find({_id: req.body._id}, function(err, docs) {
        for(var i in req.body) {
            docs[0][i] = req.body[i];
        }

        docs[0].save();
        res.json({error: false, message: "Updated."}).end();
    });
});

app.del('/tripList', (req, res) => {

});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});