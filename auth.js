var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(
    function(username, password, done) {
        var user = { name: "Ameen", password: "123456" };
        if (username == user.name && password == user.password){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    }
));

exports.isAuthenticated = passport.authenticate('basic' , {session : false});