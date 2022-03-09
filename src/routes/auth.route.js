const router = require('express').Router();
const passport = require('passport');
const path = require('path');

// path: auth/

// GET /login
router.get('/login', (req, res) => {
  //res.sendFile(path.join(__dirname, '../public/html/login.html'));
  res.redirect('/public/html/login.html');
});

// GET /google/login
router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /google/callback
router.get( '/google/callback', passport.authenticate('google'), function (req, res) {
  // print req.query.code
  console.log(req.query.code);
  // Successful authentication, redirect home.
  res.redirect('/profile');
  //res.redirect('/profile');
});

// GET /verifyLogin
router.get('/verifyLogin', (req, res) => {
  console.log(req.user);
  if(req.user){
    res.status(200).send('Logged in')
  }else{
    res.status(401).send('Unauthenticaded user')
  }
  //res.status(200).send('logged in')
});

// GET /logout
router.get('/logout', (req, res) => {
  //res.send("logout")
  req.logout();
  req.session = null;
  res.redirect('/');
});


module.exports = router;
