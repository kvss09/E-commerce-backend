import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
import bodyParser from "body-parser";
const app = express();
const PORT = 3002;
import { router } from "./routes/users.js";
import routes from "./routes/routes.js";
import "./config/mongodb.js";
app.get("/", routes);
//everything that starts with / will be a possible a routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", router);
app.listen(PORT, () => {
  console.log("Server is running localhost 3002");
});
