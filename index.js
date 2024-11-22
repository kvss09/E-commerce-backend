import express from "express";

const app = express();
const PORT = 3002;

import routes from "./routes/routes.js";
import "./config/mongodb.js";
app.use(routes);
//everything that starts with / will be a possible a routes
app.listen(PORT, () => {
  console.log("Server is running localhost 3000");
});
