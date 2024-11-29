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
  addUser(user) {
    const db = getDB();
    const collection = db.collection("users");
    return collection.insertOne(user);
  }
  getUser(email) {
    const db = getDB();
    const collection = db.collection("users");
    return collection.findOne({ email: email });
  }
  isUser(user) {
    const db = getDB();
    const collection = db.collection("users");
    return collection.findOne({ email: user.email });
  }
}
