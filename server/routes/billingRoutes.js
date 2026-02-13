const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

// module.exports = app=>{
//     app.post('/api/stripe',async (req,res)=>{
//         console.log(res);
//         // const charge=await stripe.charges.create({
//         //     amount: 500,
//         //     currency: 'usd',
//         //     description: '$5 for 5 email credits',
//         //     source: req.body.id
//         // });
//         // console.log(charge);
//         const charge=await stripe.paymentIntents.create({
//             amount: 500,
//             currency: 'usd',
//             description: '$5 for 5 email credits',
//             source: req.body.id
//         });
//         console.log(charge);
//         res.send(charge);
//     });
// };


module.exports = app => {
    app.post('/api/stripe', async (req, res) => {
        console.log("called stripe");
        const paymentIntent=await stripe.paymentIntents.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 email credits',
            automatic_payment_methods: {
                enabled: true,
            }
        });
        
      
        res.send({paymentIntent:paymentIntent});

        //console.log(res);
    });

    // Route 2: Confirm payment and update credits
    app.post('/api/stripe/confirm', async (req, res) => {
        try {
           console.log("payment confirmed",req)
        } catch (err) {
            console.error('Payment confirmation error:', err);
            res.status(400).send({ error: err.message });
        }

        res.redirect('/surveys'); 
    });


};

         