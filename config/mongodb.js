import { MongoClient, ServerApiVersion } from "mongodb";
const url = "mongodb://localhost:27017/e-commerce_users";

export const connectToMongodb = () => {
  MongoClient.connect(url)
    .then((clientinstace) => {
      client = clientinstace;
      console.log("MonngoDb is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDB = () => {
  return client.db();
};
