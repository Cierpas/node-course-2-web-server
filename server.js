const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log!')
    }
  });

  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('homePage.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello, it\'s just a Home Page'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad -send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    response: 'What ur looking for?',
      data: 'No data...',
      details: {
        you_are: 'Retarded',
        what_you_can_do: [
          'Repaire that mistake',
          'Go home',
          'Who cares'
        ]
      },
      question: 'Still here?'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});