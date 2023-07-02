const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const UserController = {
  // Create a new user in the Database
  // Their information will be sent in the request body
  // This should send the created user
  createUser(req, res, next) {
    console.log('------entering create user controller----');
    console.log('body: ', req.body);
    const { firstName, lastName, password, username, zipcode } = req.body;
    const newUser = new User({
      first_name: firstName,
      last_name: lastName,
      password,
      username,
      zipcode: Number(zipcode),
    });
    console.log('newUser', newUser);
    newUser
      .save()
      .then((savedDoc) => {
        res.locals.newUser = savedDoc;
        return next();
      })
      .catch((error) => {
        return next({
          log: "error in update student",
          status: 500,
          message: "Student name cannot be updated",
        });
      }
      )
  },
  // get method for fetching user based off of username
  getUser(req, res, next) {
    const { username, password } = req.params;
    User.findOne({ username: name })
      .then((user) => {
        // if doc is found
        if (user) {
          res.locals.user = user;
          return next();
        } else {
          return res.status(400).json({ error: 'user not found' });
        }
      })
      .catch((err) => {
        return res.status(400).json({ error: 'failed to fetch user' });
      });
  },
};

module.exports = UserController;
