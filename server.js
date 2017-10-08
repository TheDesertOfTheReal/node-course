const express       = require('express');
var app             = express();
const hbs           = require('hbs');
const fs            = require('fs');



////////////////////////////////////////////
// MIDDLEWARE & CONFIG /////////////////////
////////////////////////////////////////////

// Configs sever template to handlebars
app.set("view engine", "hbs");

// LOGGING Middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
    next();
  });
});

// MAINTENANCE SITE DOWN Middlware
// app.use((req, res, next) => {
//   res.render('maintenance')
// });

app.use(express.static(__dirname + "/public"));

////////////////////////////////////////////
// HANDLEBARS HELPERS //////////////////////
////////////////////////////////////////////

hbs.registerPartials(__dirname + "/views/partials");


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});



////////////////////////////////////////////
// ROUTES //////////////////////////////////
////////////////////////////////////////////
app.get('/', (req, res) => {
  res.render("home", {
    name: ' || JBM',
    pageTitle: "Welcome",
    welcomeMessage: "Hello, welcome to my personal site! This is where you can find all imformation about my web design services!"
  })
});


app.get('/about', (req, res) => {
  res.render('about', {
    name: ' || JBM',
    pageTitle: 'About'
  });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "This is where bad requests go when they've been naughty."
  })
});


app.listen(3000, () => {
  console.log("Server is up on PORT 3000")
});
