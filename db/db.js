const mongoose = require('mongoose');
const { testPeople, testTrips } = require('./fixtures');

mongoose.connect('mongodb://admin:b1af6d7d0c16@ds237979.mlab.com:37979/hookup');

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const PersonSchema = new Schema({
    name: String,
    email: String,
    password: String,
    drink: {type: Number, default: 0},
    smoke: {type: Number, default: 0},
    noise: {type: Number, default: 0},
});

const TripSchema = new Schema({
    start: Date,
    end: Date,
    name: String,
    location: String,
    boat: String,
    //people: Array
});

const Person = mongoose.model('Person', PersonSchema);
const Trip = mongoose.model('Trip', TripSchema);

insertFixtureTrip = (trip) => {
    Trip.find(trip, function(err, docs) {
        if(err) {
            console.log(err);
        } else {
            if(docs.length == 0) {
                Trip.create(trip);
            }
        }
    });
};

insertFixturePerson = (person) => {
    Person.find(person, function(err, docs) {
        if(err) {
            console.log(err);
        } else {
            if(docs.length == 0) {
                Person.create(person);
            }
        }
    });
};

//testTrips.forEach(function(trip) {
//    insertFixtureTrip(trip);
//});
//
//testPeople.forEach(function(person) {
//    insertFixturePerson(person);
//});

module.exports.Person = Person;
module.exports.Trip = Trip;