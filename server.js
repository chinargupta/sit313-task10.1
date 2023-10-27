const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const mailgun = require('mailgun-js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


const mg = mailgun({
  apiKey: '84e489ac23b52a7678394720511797ef-324e0bb2-5cbe92e2',
  domain: 'sandboxc96998f3a0df48d6827637364284e6d8.mailgun.org',
});

app.post('/subscribe', (req, res) => {
  const { email } = req.body;


  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email address');
  }

  const data = {  
    from: 'chinar4778.be22@chitkara.edu.in',
    to: email,
    subject: 'Welcome to our newsletter!',
    text: 'Thank you for subscribing to our newsletter. We look forward to keeping you updated with the latest information!',
  };

  mg.messages().send(data, (error, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Email not sent');
    } else {
      console.log('Email sent:', body);
      res.status(200).send('Subscription successful. Welcome email sent!');
    }
  });
});

const port = 4000;
app.listen(port, () => {
  console.log('Server is running on port 4000');
});