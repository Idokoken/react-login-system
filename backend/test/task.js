let chai = require("chai");
let chaiHttp = require("chai-http");
const server = require("../app");

//Asertion style
chai.should;
//let should = chai.should();

chai.use(chaiHttp);

//Test register user route
describe("user registeration API", () => {
  it("it should register user", (done) => {
    const user = { name: "ken", email: "ken@gmail.com", password: "111111" };
    chai
      .request(server)
      .post("/user/register")
      .json(user)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("name");
        response.body.should.have.property("email");
        response.body.should.have.property("password");

        done();
      });
  });

  it("it should not register user", (done) => {
    chai
      .request(server)
      .post("/user/registers")
      .end((err, response) => {
        response.should.have.status(404);

        done();
      });
  });
});

//Test login user route
describe("user login API", () => {
  it("it should login user", (done) => {
    const user = { email: "ken@gmail.com", password: "111111" };
    chai
      .request(server)
      .post("/user/login")
      .json(user)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("name");
        response.body.should.have.property("email");

        done();
      });
  });
  it("it should not login user", (done) => {
    chai
      .request(server)
      .post("/user/logins")
      .end((err, response) => {
        response.should.have.status(404);

        done();
      });
  });
});

//Test get user route
describe("getting logged in user API", () => {
  it("it should get logged in user", (done) => {
    chai
      .request(server)
      .get("/profile")
      //   .json()
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");

        done();
      });
  });
  it("it should not get logged in user", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, response) => {
        response.should.have.status(404);

        done();
      });
  });
});

//Test logout user route
describe("Logging out user API", () => {
  it("it should logout user", (done) => {
    chai
      .request(server)
      .post("/logout")
      .end((err, response) => {
        response.should.have.status(200);

        done();
      });
  });
  it("it should not logout user", (done) => {
    chai
      .request(server)
      .post("/")
      .end((err, response) => {
        response.should.have.status(404);

        done();
      });
  });
});
