const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('working'); 
      console.log('accessToken', accessToken); 
      console.log('refreshToken', refreshToken); 
      console.log('profile', profile);

      // lookup user using User class
        // if not exist, save it using User and call done(null, createdUser)
      // if it does exist call done(null, user) 

      User.find(profile.id)
      .then( (user) => {
        done(null, user);
      })
      .catch(async (err) => {
        console.log(err);
        let id = profile.id
        let email = profile.emails[0].value
        let imageUrl = profile.photos[0].value
        let displayName = profile.displayName
        const user = await User.create({id, email, imageUrl, displayName});
        console.log(user);
        done(null, user);
      }); 
    }
  )
);

passport.serializeUser(function (user, done) { 
  console.log('serializing');
  done(null, user.id);
});

passport.deserializeUser(function (id, done) { 
  console.log('deserializing');
  User.find(id)
  .then(user => done(null, user))
  .catch(err => done(err)); 
});
