const mongoose = require('mongoose');
const { testPeople, testTrips, testTripLists } = require('./fixtures');

mongoose.connect('mongodb://admin:b1af6d7d0c16@ds237979.mlab.com:37979/hookup');

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const PersonSchema = new Schema({
    name: String,
    password: String,
    drinkLevel: {type: Number, default: 0},
    smokeLevel: {type: Number, default: 0},
    noiseLevel: {type: Number, default: 0},
    numberOfTrips: {type: Number, default: 0},
    created: {type: Date, default: new Date()}
});

const TripSchema = new Schema({
    start: Date,
    end: Date,
    name: String,
    location: String,
    people: Array
});

const Person = mongoose.model('Person', PersonSchema);
const Trip = mongoose.model('Trip', TripSchema);

module.exports.Person = Person;
module.exports.Trip = Trip;