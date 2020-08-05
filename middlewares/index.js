/* middleware functions for authentication and authorization */
const authJwt = require('./verifyJwt');
const verifySignup = require('./verifySignup');

module.exports = {
    authJwt,verifySignup
}