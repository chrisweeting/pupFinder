const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const passport = require('passport');

router.get("/test", (req, res) => {
  res.json({ msg: "this is the user route"});
});

router.post("/signup", (req, res) => {
  const {errors, isValid} = validateSignupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    username: req.body.username,
    email: req.body.email
  })
  .then(user => {
    if (user) {
      return res.status(400).json({msg: "User already exists"});
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              const payload = {
                id: user.id,
                email: user.email,
                username: user.username,
              };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                    user: payload
                  });
                }
              );
            })
            .catch(err => res.send(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({username: "User does not exist"});
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
              username: user.username,
              name: user.name,
              type: user.type
            };

            jwt.sign(
              payload, 
              keys.secretOrKey, 
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                  user: payload
                });
              }
            );
          } else {
            return res.status(400).json({password: "Incorrect password"});
          }
        });
    });

});

module.exports = router;