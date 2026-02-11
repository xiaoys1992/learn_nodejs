const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');



require('./models/User');
require('./service/passport');





const app = express();
mongoose.connect(keys.mongoURI);

// app.use(cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
// }));

app.use(bodyParser.json());

app.use(session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days
    }
}));


app.use(passport.initialize());
app.use(passport.session());




require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);




const port=process.env.PORT || 5000;
app.listen(port);