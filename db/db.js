import mongoose from 'mongoose';
import Fixtures from './fixtures'

mongoose.connect('mongodb://admin:b1af6d7d0c16@ds237979.mlab.com/hookup');

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
    location: String
});


const TripListSchema = new Schema({
    tripId: ObjectId,
    people: Array
});

const Person = mongoose.model('Person', PersonSchema);
const Trip = mongoose.model('Trip', TripSchema);
const TripList = mongoose.model('TripList', TripListSchema);


export { Person, Trip, TripList };