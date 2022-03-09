const app = require('./app');
const port = process.env.PORT || 3000;

const auth = require('../src/routes/auth.route');
const profile = require('../src/routes/profile.route');

//Añade el router de auth a la ruta /auth.
app.use('/auth',auth);
app.use('/profile',profile);

app.listen(port, () => console.log(`Listening on localhost:${port}/`));