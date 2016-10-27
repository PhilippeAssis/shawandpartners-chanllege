var express = require('express');
var app = express();
var isPalindrome = require('is-palindrome');

require('dotenv').config({silent: true})

var port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Started on port ${port}`)
});

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/palindrome', function (req, res) {
  if(req.query.word && isPalindrome(req.query.word)){
    return res.sendStatus(200)
  }

  res.sendStatus(400)
});


app.get('/', function (req, res) {
  res.render('index')
});
