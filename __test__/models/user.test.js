const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
const User = require("../../model/user");

const userData = {
    email: 'test@gmail.com',
    // auth_id:authProfile[0]._id,
    first_name: 'test_first_name',
    last_name: 'test_last_name',
    user_type: 'candidate'
}

describe('Test Authentication Models', () => {
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
        await connection.dropDatabase();
    });

    it("create & save user sucessfully", async () => {
        const validUser = new User(userData);
        await validUser.setPassword(userData.password);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.phone).toBe(userData.phone);
        expect(savedUser.salt).toBeDefined();
    })

    // You shouldn't be able to add in any field that isn't defined in the schema
  it("insert user successfully, but the field not defined in schema should be undefined", async () => {
    const userWithInvalidField = new User({
      ...userData,
      nickname: "Handsome TekLoon",
    });
    await userWithInvalidField.setPassword(userData.password);
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickname).toBeUndefined();
  });

  // It should us tell us the errors in on email field.
  it("create user without required field should failed", async () => {
    const userWithoutRequiredField = new User({ name: "TekLoon" });
    let err;
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.email).toBeDefined();
  });

})
