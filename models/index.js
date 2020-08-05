const config = require('../db.config');
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.DIALECT,
    }
)

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// creating all tables
db.user = require('./user.model')(sequelize,Sequelize)
db.role = require('./role.model')(sequelize,Sequelize)
db.blog = require('./blog.model')(sequelize,Sequelize)
db.comment = require('./comment.model')(sequelize,Sequelize)
db.reply = require('./reply.model')(sequelize,Sequelize)

// one role can be assigned to many users, but a user has only one role
// so one-to-many mapping
db.role.hasMany(db.user);
db.user.belongsTo(db.role)

// one user(author) can write many blogs, but a blog has only one author
// so one-to-many mapping
db.user.hasMany(db.blog)
db.blog.belongsTo(db.user)

// one blog can have many comments, but a comment is unique to its blog
// so one-to-many mapping
db.blog.hasMany(db.comment)
db.comment.belongsTo(db.blog)

// one comment can have many replies, but each reply can point to only one comment
// so one-to-many mapping
db.comment.hasMany(db.reply)
db.reply.belongsTo(db.comment)

// roles
db.ROLES = ['Super-admin','Admin','Author','Moderator']

module.exports = db;