const mocha = require("mocha");
var Client = require('node-rest-client').Client;
var client = new Client();

describe("The Person REST endpoints", function() {
    let personId, person;
    it("should be able to create and save instances of People", function(done) {
        const args = {
            data: { name: "Test User", email: "test@test.net", password: "test1234" },
            headers: { "Content-Type": "application/json" }
        };

        client.post("http://localhost:3000/api/v1/people", args, function(data, response) {
           if(data.error) {
               person = data.message;
               done(data.message);
           } else {
               done();
           }
        });
    });

    it("should be able to find instances of People", function(done) {
        client.get("http://localhost:3000/api/v1/people?email=test@test.net", function(data, response) {
            console.log(data);
            if(data.error) {
                done(data.message);
            } else {
                done();
            }
        });
    });

    it("should be able to alter instances of People", function(done) {
        client.get("http://localhost:3000/api/v1/people?email=test@test.net", function(data, response) {
            if(data.error) {
                done(data.message);
            } else {
                console.log(data);
                data[0].name = "Modified Test";

                const args = {
                    data: data[0],
                    headers: { "Content-Type": "application/json" }
                };

                client.put("http://localhost:3000/api/v1/people", args, function(data, response) {
                    if(data.error) {
                        done(data.message);
                    } else {
                        done();
                    }
                });
            }
        });
    });

    it("should be able to delete instances of People", function(done) {
        client.delete("http://localhost:3000/api/v1/people?email=test@test.net", function(data, response) {
            if(data.error) {
                done(data.message);
            } else {
                done();
            }
        });
    });
});

describe("The Trip REST endpoints", function() {
    let tripId, trip;
    it("should be able to create and save instances of Trips", function(done) {
        done();
    });

    it("should be able to find instances of Trips", function(done) {
        done();
    });

    it("should be able to alter instances of Trips", function(done) {
        done();
    });

    it("should be able to delete instances of Trips", function(done) {
        done();
    });
});