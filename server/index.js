const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


require('./models/User');
require('./service/passport');





const app = express();
mongoose.connect(keys.mongoURI);

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());




require('./routes/authRoutes')(app);




const port=process.env.PORT || 5000;
app.listen(port);