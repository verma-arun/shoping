const jwt = require("jsonwebtoken");

module.exports = (app) => {
  const users = require("../controllers/users.controller");

  app.post("/authenticate", users.authenticate);

  // Create a new User
  app.post("/user", users.create);

  // Retrieve all users
  app.get("/users", authenticateToken, users.findAll);

  // Retrieve a single User with Id
  app.get("/users/:id", authenticateToken, users.findOne);

  // Update a User with Id
  app.put("/users/:id", authenticateToken, users.update);

  // Delete a User with Id
  app.delete("/users/:id", authenticateToken, users.delete);
};

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, "privatekey", (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}
