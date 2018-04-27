const mongoose = require('mongoose');
const { testUsers, testTrips } = require('./fixtures');

mongoose.connect('mongodb://admin:b1af6d7d0c16@ds237979.mlab.com:37979/hookup');

const salt = "5a1`3f!e6#@8#94)9e7!@!c97k15f";

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

const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    drink: {type: Boolean, default: 0},
    smoke: {type: Boolean, default: 0},
    weed: {type: Boolean, default: 0},
    noise: {type: Boolean, default: 0},
    token: {type: String}
});

const TripSchema = new Schema({
    start: Date,
    end: Date,
    name: String,
    location: String,
    boat: String
    //people: Array
});

const User = mongoose.model('User', UserSchema);
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

insertFixtureUser = (user) => {
    User.find({email: user.email}, function(err, docs) {
        if(err) {
            console.log(err);
        } else {
            if(docs.length == 0) {
                console.log("Creating user "+user.email);
                user.password = sha512(user.password, salt);
                User.create(user);
            }
        }
    });
};

testTrips.forEach(function(trip) {
    insertFixtureTrip(trip);
});

testUsers.forEach(function(user) {
    insertFixtureUser(user);
});

module.exports.User = User;
module.exports.Trip = Trip;