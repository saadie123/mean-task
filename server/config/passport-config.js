const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      if (jwt_payload.username === "admin") {
        return done(null, jwt_payload);
      } else {
        return done(null, false);
      }
    })
  );
};
