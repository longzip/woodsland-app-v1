const { User } = require("../models/index");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const stage = 10;

function validateUser(user) {
  const schema = {
    name: Joi.string(),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 })
  };
  return Joi.validate(user, schema);
}

module.exports = {
  delete: (req, res) => {
    let result = {};
    let status = 200;

    User.findByPk(req.params.id)
      .then(item => {
        result.status = status;
        result.result = item.destroy();
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  },

  add: (req, res) => {
    let result = {};
    let status = 201;

    let { error, value } = validateUser(req.body);

    if (error) {
      status = 500;
      result.status = status;
      result.error = error;
      return res.status(status).send(result);
    }

    bcrypt.hash(value.password, stage.saltingRounds, function(err, hash) {
      if (err) {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      } else {
        value.password = hash;
        User.create(value)
          .then(user => {
            result.status = status;
            result.result = user;
            return res.status(status).send(result);
          })
          .catch(err => {
            status = 500;
            result.status = status;
            result.error = err;
            return res.status(status).send(result);
          });
      }
    });
  },

  show: (req, res) => {
    let result = {};
    let status = 200;

    User.findByPk(req.params.id)
      .then(uom => {
        result.status = status;
        result.result = uom;
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  },

  update: (req, res) => {
    let result = {};
    let status = 201;

    let { error, value } = validateUser(req.body);
    if (value.password) {
      bcrypt.hash(value.password, stage.saltingRounds, function(err, hash) {
        if (err) {
          status = 500;
          result.status = status;
          result.error = err;
          return res.status(status).send(result);
        } else {
          value.password = hash;
          User.update(value, {
            where: {
              id: req.params.id
            }
          })
            .then(affectedRows => {
              result.status = status;
              result.result = affectedRows;
              return res.status(status).send(result);
            })
            .catch(err => {
              status = 500;
              result.status = status;
              result.error = err;
              return res.status(status).send(result);
            });
        }
      });
    } else {
      User.update(value, {
        where: {
          id: req.params.id
        }
      })
        .then(affectedRows => {
          result.status = status;
          result.result = affectedRows;
          return res.status(status).send(result);
        })
        .catch(err => {
          status = 500;
          result.status = status;
          result.error = err;
          return res.status(status).send(result);
        });
    }
  },

  getAll: (req, res) => {
    let result = {};
    let status = 200;

    User.findAll()
      .then(users => {
        result.status = status;
        result.result = users;
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  },

  login: (req, res) => {
    let result = {};
    let status = 200;
    const { username, password } = req.body;

    User.findOne({ where: { username } })
      .then(user => {
        // We could compare passwords in our model instead of below as well
        bcrypt
          .compare(password, user.password)
          .then(match => {
            if (match) {
              status = 200;
              // Create a token

              const payload = { user: user.name };
              const options = {
                expiresIn: "2d",
                issuer: "https://woodsland.com.vn"
              };
              const secret = "sdkfjksdjkfjkjfsiojfksdjkfsd";

              const token = jwt.sign(payload, secret, options);

              result.token = token;
              result.status = status;
              result.result = {
                id: user.id,
                name: user.name,
                username: user.uom,
                email: user.username,
                token,
                roles: ["admin"],
                rights: ["can_view_users"]
              };
            } else {
              status = 401;
              result.status = status;
              result.error = `Authentication error`;
            }
            return res.status(status).send(result);
          })
          .catch(err => {
            status = 500;
            result.status = status;
            result.error = err;
            return res.status(status).send(result);
          });
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      });
  }
};
