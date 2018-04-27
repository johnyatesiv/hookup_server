module.exports.testUsers = [
    {
        email: "test@test.net",
        password: "test1234",
        drink: 1,
        smoke: 1,
        weed: 1,
        noiseLevel: 0
    }
];

module.exports.testTrips = [
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
