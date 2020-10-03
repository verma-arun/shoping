const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }
  const password = bcrypt.hashSync(req.body.password, 10);
  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send({
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((Users) => {
      res.send(Users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .then((User) => {
      if (!User) {
        return res.status(404).send({
          message: "User not found with id " + req.params.UserId,
        });
      }
      res.send(User);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.UserId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with id " + req.params.UserId,
      });
    });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  // Find User and update it with the request body
  User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  )
    .then((User) => {
      if (!User) {
        return res.status(404).send({
          message: "User not found with id " + req.params.UserId,
        });
      }
      res.send(User);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.UserId,
        });
      }
      return res.status(500).send({
        message: "Error updating User with id " + req.params.UserId,
      });
    });
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((User) => {
      if (!User) {
        return res.status(404).send({
          message: "User not found with id " + req.params.UserId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.UserId,
        });
      }
      return res.status(500).send({
        message: "Could not delete User with id " + req.params.UserId,
      });
    });
};

exports.authenticate = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      "privatekey",
      {
        expiresIn: "7d",
      }
    );
    res.status(200).send({
      ...user.toJSON(),
      token,
    });
  } else {
    res.status(401).send({
      message: "Please check your credentials.",
    });
  }
};
