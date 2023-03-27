const passport = require('passport');

const auth = passport.authenticate('jwt', { session: false }, () => {
    console.log("jwt passport intialized")
});

module.exports = auth;
