const router = require('express').Router();
const passport = require('passport');

const path = require('path');

// path: profile/

// GET /profile
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/profile.html'));
  //console.log("hola");
  console.log(req.user);
});

//Authenticated USER
router.get('/authUser', (req, res) =>{
  if(req.user){
    const user = {user: req.user};
    res.status(200).send(user);
  }else{
    res.status(401).send('Unauthenticated User');
  }
})

module.exports = router;
