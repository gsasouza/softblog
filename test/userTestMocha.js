const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const User = require("../models/userModel");
const app = require("../server");

chai.use(chaiHttp);

describe("User", () => {
  before(done => {
    User.remove({}, err => {
      done();
    });
  });
  describe("GET => /users", () => {
    it("Should return an array with the users", done => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("POST => /users", () => {
    it("Should create a user", done => {
      chai
        .request(app)
        .post("/api/users")
        .send({
          username: "joaozinho",
          password: "1234",
          name: "João",
          function: "Boss"
        })
        .end((err, res) => {
          res.should.have.status(201);          
          done();
        });
    });
  });
  describe("GET => /users/{username}", () => {
    it("Should get a specific user", done => {
      chai
        .request(app)
        .get("/api/users/joaozinho")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("PUT => /users/{username}", () => {
    it("Should update a specific user", done => {
      chai
        .request(app)
        .put("/api/users/joaozinho")
        .send({ name: "Little John" })
        .end((err, res) => {
          res.should.have.status(200);
          chai
            .request(app)
            .get("/api/users/joaozinho")
            .end((error, response) => {
              response.body.name.should.be.eql("Little John");
              done();
            });
        });
    });
  });

  describe("DELETE => /users/{username}", () => {
    it("Should delete a specific user", done => {
      chai
        .request(app)
        .delete("/api/users/joaozinho")
        .end((err, res) => {
          res.should.have.status(200);
          User.find({}, (err, users) => {
            users.length.should.be.eql(0);
            done();
          });
        });
    });
  });
});
