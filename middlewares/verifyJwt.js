/* These methods act as authorization filters to different routes */
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
let userId = 0;

// verifies if the jwt token is valid. If valid, the user id is set in the 
// request object
verifyToken = (req,res,next) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        res.status(403).send({
            message: 'auth token missing'
        })
        return
    }

    jwt.verify(token,config.secretKey,(err,user) => {
        if(err) {
            res.status(401).send({
                message: 'Unauthorized'
            });
        }
        userId = user.data.id;
        req.userId = user.data.id;
        next();
    })
}

isSuperAdmin = (req,res,next) => {
    User.findByPk(userId).then(user => {
        user.getRole().then(role => {
            if(role.name == 'Super-admin') {
                next();
                return
            }

            res.status(403).send({
                message: 'Not authorized'
            })
            return;
        })
    })
}

isAdmin = (req,res,next) => {
    User.findByPk(userId).then(user => {
        user.getRole().then(role => {
            if(role.name == 'Admin') {
                next();
                return
            }

            res.status(403).send({
                message: 'Not authorized'
            })
            return;
        })
    })
}

isAuthor = (req,res,next) => {
    User.findByPk(userId).then(user => {
        user.getRole().then(role => {
            if(role.name == 'Author') {
                next();
                return
            }

            res.status(403).send({
                message: 'Not authorized'
            })
            return;
        })
    })
}

isModerator = (req,res,next) => {
    User.findByPk(userId).then(user => {
        user.getRole().then(role => {
            if(role.name == 'Moderator') {
                next();
                return
            }

            res.status(403).send({
                message: 'Not authorized'
            })
            return;
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    isSuperAdmin: isSuperAdmin,
    isAdmin: isAdmin,
    isAuthor: isAuthor,
    isModerator: isModerator
};

module.exports = authJwt;