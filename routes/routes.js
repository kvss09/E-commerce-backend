import express from "express";
import homeController from "../controllers/home.controller.js";
const routes = express.Router();
routes.get("/", homeController);
routes.get("/about", (req, res) => {
  res.send("About page");
});
export default routes;
