const homeController = (req, res) => {
  console.log(req.cookies.auth_token);
  res.send("hello, World!...");
};
export default homeController;
