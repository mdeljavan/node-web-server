const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('uppercase', (text) => {
  return text.toUpperCase();
})
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now} : ${req.method} ${req.url} \n`;
  fs.appendFile('server.log', log, (err) => {
    console.log(err);
  });
  next();
});


// app.use((req, res, next) => {
  
//   res.render('maintance.hbs');
//   next();
// });



app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our site'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Me'
  });
})

app.get('/bad', (req, res) => {
  res.send({
    status: '400',
    error:'bad request'
  })
})

app.listen(3000, () => {
  console.log('express on http://localhost:3000');
})