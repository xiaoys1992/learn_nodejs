const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const Mailer = require('../service/Mailer');
const surveyTemplate = require('../service/emailTemplates/surveyTemplates');
const _ = require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');


module.exports = app => {

    app.get('/api/survey/:surveyId/:choice', (req, res) => {
        res.send("Thanks for your feedback!");
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p=new Path('/api/survey/:surveyId/:choice');
     

     _.chain(req.body)
    .map(({email,url})=>{
        const match=p.test(new URL(url).pathname);
        if(match){
            return {email: email, surveyId: match.surveyId, choice: match.choice};
        }
    })
    .compact()
    .uniqBy('email','surveyId')
    .each(event=>{
        Survey.updateOne({_id: event.surveyId,
             recipients: {email: event.email}}, 
             {$inc: {[event.choice]: 1}, 
             $set: {
                'recipients.$.responded': true
             },
             lastResponded: new Date()
            }).exec();
             })
    .value();


    res.send({});

});

app.get('/api/surveys/', requireLogin, async (req, res) => {
    const surveys=await Survey.find({_user: req.user.id}).select({recipients: false});
    res.send(surveys);
});

    app.post('/api/surveys',requireLogin, requireCredits, async(req, res) => {
       const { title, subject, body, recipients } = req.body;
       const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now()
       });

       console.log("survey created");

       const mailer = new Mailer(survey, surveyTemplate(survey));

       console.log("mailer created");

       try{

        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user=await req.user.save();
        res.send(user);
        console.log("sent");
       }catch(err){
        res.status(422).send(err);
       }

      

    });

    
};