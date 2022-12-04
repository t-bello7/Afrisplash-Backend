const {MongoClient} = require('mongodb');
const request = require("supertest");
const {describe, expect, test} = require('@jest/globals');
// const {
//     register,
// //     login,
// //     logout,
// //     forgotPassword,
// //     resetPassword
// } = require("../../controllers/auth");
const app = require("../../server");

describe('Test Authentication Controllers', () => {
  let connection;
  let db;
  beforeAll(async () => {
      connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });
    
  afterAll(async () => {
      await connection.close();
  });

  // Test for the root page
  test("It should return 200 response GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  // Test for register api at /api/v1/auth/register
  test("Test registration route ", () => {

  });

  // Test for login api at /api/v1/auth/login
  test("Test registration route ", () => {

  });

  //Test for logout api at /api/v1/auth/logout
  test("Test for logout route", () => {

  });

  // Test for forgot password at /api/v1/auth/forgot-password
  test("Test for fogot password route", () => {

  });


  // test("should save the username and password in the database", async () => {
  //     const body = {
  //       username: "username",
  //       password: "password"
  //     }
  //     const response = await request(app).post("/api/v1/auth/register").send(body) 
  
  // })

})