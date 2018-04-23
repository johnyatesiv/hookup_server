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
        name: "Trip1",
        location: "Mission Bay",
        boat: "Boaty McBoatface",
        start: new Date(),
        end: new Date(),
        people: []
    },
    {
        name: "Trip2",
        location: "San Diego / Mexico",
        boat: "USS Enterprise",
        start: new Date(),
        end: new Date(),
        people: []
    }
];


module.exports.testPeople = People,
module.exports.testTrips = Trips
