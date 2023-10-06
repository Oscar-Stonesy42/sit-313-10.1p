const formData = require('form-data');
const Mailgun = require('mailgun.js');
const express = require('express');
const dotenv = require('dotenv');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'MY_API_KEY'});


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const email = req.body.email;
    mg.messages.create('MY_DOMAIN', {
        from: "Excited User <mailgun@sandbox-123.mailgun.org>",
        to: [email],
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>"
    })
    .then(msg => console.log(msg)) // logs response data
    .catch(err => console.log(err)); // logs any error
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
    console.log("MAILGUN_API_KEY:", process.env.MAILGUN_API_KEY);
    console.log("MAILGUN_DOMAIN:", process.env.MAILGUN_DOMAIN);

})

