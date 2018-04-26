const { Person, Trip } = require("./db.js");

const People = [
    {
        name: "Old Timer",
        password: "",
        drinkLevel: Number,
        smokeLevel: Number,
        noiseLevel: Number,
        numberOfTrips: Number,
        created: Date
    }
];

const Trips = [
    {
        name: "Mission Bay 2 Hour Trip",
        location: "Mission Bay",
        boat: "Boaty McBoatface",
        start: new Date(),
        end: new Date(),
        //people: [],
        numPeople: 0
    },
    {
        name: "Coronado to Tijuana Half Day",
        location: "Coronado",
        boat: "USS Enterprise",
        start: new Date(),
        end: new Date(),
        numPeople: 1,
        //people: [{name: "test guy"}]
    }
];

module.exports.testPeople = People;
module.exports.testTrips = Trips;
