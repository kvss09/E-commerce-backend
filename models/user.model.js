import { getDB } from "../config/mongodb.js";

export default class userModel {
  constructor(firstName, lastName, email, password, mobile, address, pin) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.mobile = mobile;
    this.address = address;
    this.pin = pin;
  }
  // add methods for userModel here
  //add to database
  async addUser(user) {
    const db = getDB();
    const collection = db.collection("users");
    return await collection.insertOne(user);
  }
  async getUser(email) {
    const db = getDB();
    const collection = db.collection("users");
    return await collection.findOne({ email: email });
  }
  async isUser(user) {
    const db = getDB();
    console.log(user);
    const collection = db.collection("users");
    return await collection.findOne({ email: user.email });
  }
  async getUserById(id) {
    const db = getDB();
    console.log(id);
    const collection = db.collection("users");
    const user = await collection.findOne({ _id: id });
    console.log(user);
    return user;
  }
}
