const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');

const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost:27017/feedback_collection', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("There is a connection error", err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.use(express.static('public')); 


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/submit-feedback', async (req, res) => {
  try {
    const feedback = new Feedback({
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      feedback: req.body.feedback
    });

    await feedback.save();
    res.redirect('/success'); 
  } catch (err) {
    res.status(500).send('Failed to submit feedback');
  }
});


app.get('/success', (req, res) => {
  res.sendFile(__dirname + '/views/success.html');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
