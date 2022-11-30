require('dotenv')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.email === "paul@nanosoft.co.za") {
        return done(null, true)
    }
    return done(null, false)
}) 