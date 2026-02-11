const passport = require('passport');

module.exports = app=>{

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google'),
(req,res)=>{
    res.redirect('/surveys');
});
app.get('/api/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/');  // Will be null/undefined after logout
    });
});
app.get('/api/current_user', (req,res)=>{
    res.send(req.user);
});
};