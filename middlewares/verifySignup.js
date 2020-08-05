const db = require('../models')
const ROLES = db.ROLES
const User = db.user

module.exports.checkDuplicateUsernameOrEmail = (req,res,next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message:'Username already taken'
            });
            return
        };
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if(user) {
                res.status(400).send({
                    message:'Email already exists'
                });
                return
            }
            next()
        })
    })
}


module.exports.checkRoleExists = (req,res,next) => {
    if(req.body.role) {
        if(!ROLES.includes(req.body.role.name)){
            res.status(400).send({
                message: 'Role does not exist'
            })
        }
    }
    next()
}