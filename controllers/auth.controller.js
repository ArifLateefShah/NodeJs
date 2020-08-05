const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Role = db.role;

const op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

exports.signup = (req,res) => {
    User.create({
        username:req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
    })
    .then(user => {
        if(req.body.role.name) {
            Role.findOne({
                where: {
                    name: req.body.role.name
                }
            }).then(role => {
                user.setRole(role).then((user) => {
                    res.status(200).send({
                        message:'User added',
                    })
                })
            })
        } else {
            user.setRole(4).then((user) => {
                res.status(200).send({
                    message:'User added',
                })
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:err.message
        })
    })
}

exports.signin = (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      },
      include: Role
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        let passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        let token = jwt.sign({ data:{ 
          id: user.id,
          username: user.username,
          role: user.role.name 
        }
        }, config.secretKey, {
          expiresIn: 86400 // 24 hours
        });
        let authority;
        user.getRole().then(role => {
            authority = `ROLE_${role.name.toUpperCase()}`
            res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              roles: authority,
              accessToken: token
            });
        })
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };