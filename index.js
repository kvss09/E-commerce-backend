import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
const PORT = 3002;
import { router } from "./routes/users.js";
import routes from "./routes/routes.js";
import { isUserSignedIn } from "./middlewares/authentication.js";
import "./config/mongodb.js";
import { emaiRouter } from "./routes/email.js";
app.use(cookieParser());
app.get("/", isUserSignedIn, routes);

//everything that starts with / will be a possible a routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use("/users", router);
app.use("/sendEmail", isUserSignedIn, emaiRouter);
app.listen(PORT, () => {
  console.log("Server is running localhost 3002");
});
